CREATE
OR REPLACE FUNCTION public.func_account() RETURNS SETOF account LANGUAGE sql STABLE AS $$ WITH data AS (
  WITH data AS (
    SELECT
      account.initial_amount AS amount,
      account.id AS account_id
    FROM
      account
    UNION
    ALL
    SELECT
      sum(tr.amount) AS sum,
      ac_1.id AS account_id
    FROM
      (
        transaction tr
        JOIN account ac_1 ON ((tr.account_id = ac_1.id))
      )
    GROUP BY
      ac_1.id
  )
  SELECT
    sum(data_1.amount) AS sum,
    data_1.account_id
  FROM
    data data_1
  GROUP BY
    data_1.account_id
)
SELECT
  ac.id,
  ac.legacy_key,
  ac.name,
  ac.initial_amount,
  ac.minimum,
  ac.created_at,
  ac.updated_at,
  ac.colour,
  data.sum,
  (
    SELECT
      max(transaction.date) AS max
    FROM
      transaction
    WHERE
      (transaction.account_id = ac.id)
  ) AS most_recent_transaction_date,
  CASE
    WHEN (data.sum = (0) :: numeric) THEN 'inactive' :: text
    ELSE 'active' :: text
  END AS status
FROM
  (
    data
    JOIN account ac ON ((data.account_id = ac.id))
  );

$$;
