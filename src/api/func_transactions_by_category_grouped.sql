-- reference table for graphql only
CREATE TABLE __transactions_by_category_grouped (
   date timestamp,
   balance numeric(19, 2),
   expense numeric(19, 2),
   income numeric(19, 2)
);

-- get the aggregate sum of transaction amounts which match a given category, grouped by a time period
CREATE OR REPLACE FUNCTION func_transactions_by_category_grouped (v_category_id text, v_group_by text)
   RETURNS SETOF __transactions_by_category_grouped
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
      generate_series('2017-01-01 00:00'::timestamp, now()::timestamp, ('1 ' || v_group_by)::interval) AS group_date) s
   LEFT JOIN grouped_data d ON d.group_date = s.group_date;

$$
LANGUAGE sql
STABLE;

