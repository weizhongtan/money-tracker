-- reference table for graphql only
CREATE TABLE __transactions_group_by (
   date timestamptz,
   sum numeric(19, 2)
);

CREATE OR REPLACE FUNCTION func_transactions_by_category_grouped (v_category_id uuid, v_group_by text)
   RETURNS SETOF __transactions_group_by
   AS $$
   SELECT
      date_trunc(v_group_by, transactions.date) AS group_date,
      sum(transactions.amount) AS sum
   FROM
      transactions
   WHERE
      v_category_id IS NULL
      OR category_id = v_category_id
   GROUP BY
      group_date
   ORDER BY
      group_date;

$$
LANGUAGE sql
STABLE;

