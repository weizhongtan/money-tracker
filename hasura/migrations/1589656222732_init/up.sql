CREATE TABLE public.__category_by_date_type (
    id uuid,
    name text,
    sum numeric(19,2)
);
CREATE FUNCTION public.func_category_by_date_type(v_start_date timestamp with time zone, v_end_date timestamp with time zone, v_account_id uuid, v_category_type text, v_parent boolean) RETURNS SETOF public.__category_by_date_type
    LANGUAGE sql STABLE
    AS $$
  WITH data AS (
    SELECT
      t.amount,
      CASE v_parent
      WHEN TRUE THEN
        -- get the name of the parent category if it exists, otherwise return the category name
        coalesce(pc.name, c.name)
      ELSE
        c.name
      END AS category_name,
      coalesce(pc.type, c.type) AS category_type
    FROM
      transactions t
      INNER JOIN categories c ON t.category_id = c.id
      LEFT JOIN categories pc ON c.parent_category_id = pc.id
    WHERE (v_account_id IS NULL
      OR t.to_account_id = v_account_id)
    AND t.date >= v_start_date
    AND t.date <= v_end_date
    AND coalesce(pc.type, c.type) = v_category_type
    -- exclude internal transfers
    AND t.from_account_id IS NULL
),
grouped_data AS (
  SELECT
    data.category_name,
    sum(data.amount) AS sum
  FROM
    data
  GROUP BY
    data.category_name
)
SELECT
  c.id,
  gd.category_name,
  gd.sum
FROM
  grouped_data gd
  LEFT JOIN categories c ON c.name = gd.category_name
$$;
CREATE TABLE public.__transactions_group_by (
    date timestamp with time zone,
    sum numeric(19,2)
);
CREATE FUNCTION public.func_transactions_by_account_grouped_cumulative(v_account_id uuid, v_group_by text, v_start_date timestamp with time zone) RETURNS SETOF public.__transactions_group_by
    LANGUAGE sql STABLE
    AS $$
   WITH data AS (
      -- first row should be the initial amount from the account
      -- date is equal to the given start date
      SELECT
         CASE
         -- if v_account_id is not provided, create one record with the sum total of all initial accounts
         WHEN v_account_id IS NULL THEN
            date_trunc(v_group_by, v_start_date)
         ELSE
            v_start_date
         END AS group_date,
         initial_amount AS sum
      FROM
         accounts
      WHERE
         v_account_id IS NULL
         OR id = v_account_id
      UNION ALL
      SELECT
         -- group transactions by time period
         date_trunc(v_group_by, transactions.date) AS group_date,
         sum(transactions.amount) AS sum
      FROM
         transactions
      WHERE
         -- if v_account_id is not provided, match all transactions
         v_account_id IS NULL
         OR to_account_id = v_account_id
      GROUP BY
         group_date
)
   SELECT
      data.group_date,
      -- for each row, add all previous rows to its sum value (cumulative)
      sum(data.sum) OVER (ORDER BY data.group_date ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS sum
   FROM
      data;
$$;
CREATE TABLE public.__transactions_by_category_grouped (
    date timestamp with time zone,
    balance numeric(19,2),
    expense numeric(19,2),
    income numeric(19,2)
);
CREATE FUNCTION public.func_transactions_by_category_grouped(v_category_id uuid, v_group_by text) RETURNS SETOF public.__transactions_by_category_grouped
    LANGUAGE sql STABLE
    AS $$
   WITH raw_data AS (
      SELECT
         t.date,
         t.amount AS balance,
         CASE WHEN (t.amount < 0) THEN
            t.amount
         ELSE
            0
         END AS expense,
         CASE WHEN (t.amount > 0) THEN
            t.amount
         ELSE
            0
         END AS income
      FROM
         transactions t
         INNER JOIN categories c ON t.category_id = c.id
         LEFT JOIN categories pc ON c.parent_category_id = pc.id
      WHERE
         -- if v_category_id is not provided, match all rows
         v_category_id IS NULL
         OR c.id = v_category_id
         -- if the transaction category does not match, try matching against the categories parent category
         OR pc.id = v_category_id
),
grouped_data AS (
   SELECT
      -- group transactions by time period
      date_trunc(v_group_by, date) AS group_date,
      sum(balance) AS balance,
      sum(expense) AS expense,
      sum(income) AS income
   FROM
      raw_data
   GROUP BY
      group_date
   ORDER BY
      group_date
)
SELECT
   coalesce(d.group_date, s.group_date) AS group_date,
   coalesce(d.balance, 0),
   coalesce(d.expense, 0),
   coalesce(d.income, 0)
FROM (
   SELECT
      *
   FROM
      generate_series('2017-01-01 00:00'::timestamptz, now()::timestamptz, ('1 ' || v_group_by)::interval) AS group_date) s
   LEFT JOIN grouped_data d ON d.group_date = s.group_date;
$$;
CREATE TABLE public.accounts (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    legacy_key text NOT NULL,
    name text NOT NULL,
    initial_amount numeric(19,2) NOT NULL,
    minimum numeric(19,2) NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    colour text
);
CREATE TABLE public.categories (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    legacy_key text NOT NULL,
    name text NOT NULL,
    type text,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    parent_category_id uuid
);
CREATE TABLE public.transactions (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    date timestamp with time zone DEFAULT now() NOT NULL,
    amount numeric(19,2) NOT NULL,
    description text NOT NULL,
    pair_id uuid,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    from_account_id uuid,
    to_account_id uuid,
    category_id uuid,
    paired_with_id uuid
);
CREATE VIEW public.view_accounts AS
 WITH data AS (
         WITH data AS (
                 SELECT accounts.initial_amount AS amount,
                    accounts.id AS account_id
                   FROM public.accounts
                UNION ALL
                 SELECT sum(tr.amount) AS sum,
                    ac_1.id AS account_id
                   FROM (public.transactions tr
                     JOIN public.accounts ac_1 ON ((tr.to_account_id = ac_1.id)))
                  GROUP BY ac_1.id
                )
         SELECT sum(data_1.amount) AS sum,
            data_1.account_id
           FROM data data_1
          GROUP BY data_1.account_id
        )
 SELECT data.sum,
    data.account_id,
    ac.id,
    ac.legacy_key,
    ac.name,
    ac.initial_amount,
    ac.minimum,
    ac.created_at,
    ac.updated_at,
    ac.colour
   FROM (data
     JOIN public.accounts ac ON ((data.account_id = ac.id)));
CREATE VIEW public.view_categories_with_parents AS
 SELECT c.id,
    c.name,
    pc.name AS parent_category_name,
    pc.id AS parent_category_id,
    COALESCE(((pc.name || ':'::text) || c.name), c.name) AS full_name,
    COALESCE(pc.type, c.type) AS type
   FROM (public.categories c
     LEFT JOIN public.categories pc ON ((c.parent_category_id = pc.id)));
ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT accounts_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_parent_category_id_fkey FOREIGN KEY (parent_category_id) REFERENCES public.categories(id) ON UPDATE CASCADE ON DELETE SET NULL;
ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id) ON UPDATE CASCADE ON DELETE SET NULL;
ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_from_account_id_fkey FOREIGN KEY (from_account_id) REFERENCES public.accounts(id) ON UPDATE CASCADE ON DELETE SET NULL;
ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_paired_with_id_fkey FOREIGN KEY (paired_with_id) REFERENCES public.transactions(id) ON UPDATE CASCADE ON DELETE SET NULL;
ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_to_account_id_fkey FOREIGN KEY (to_account_id) REFERENCES public.accounts(id) ON UPDATE CASCADE ON DELETE SET NULL;
