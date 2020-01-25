-- reference table for graphql only
CREATE TABLE __transactions_group_by (
   date timestamptz,
   sum numeric(19, 2)
);

CREATE OR REPLACE FUNCTION func_transactions_by_category_grouped (v_category_id uuid, v_group_by text)
   RETURNS SETOF __transactions_group_by
   AS $$
   SELECT
      -- group transactions by time period
      date_trunc(v_group_by, transactions.date) AS group_date,
      -- if the row has a split_amount, use that rather than the corresponding parent transaction amount
      sum(coalesce(split_transactions.amount, transactions.amount)) AS sum
   FROM
      transactions
   LEFT JOIN split_transactions ON (split_transactions.transaction_id = transactions.id)
   -- if v_category_id is not provided, match all rows
WHERE (v_category_id IS NULL
   OR (transactions.category_id = v_category_id
      OR split_transactions.category_id = v_category_id))
GROUP BY
   group_date
ORDER BY
   group_date;

$$
LANGUAGE sql
STABLE;

