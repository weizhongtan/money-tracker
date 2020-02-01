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
      date_trunc(v_group_by, t.date) AS group_date,
      sum(t.amount) AS sum
   FROM
      transactions t
      INNER JOIN categories c ON t.category_id = c.id
      LEFT JOIN categories pc ON c.parent_category_id = pc.id
   WHERE
      -- if v_category_id is not provided, match all rows
      v_category_id IS NULL
      OR c.id = v_category_id
      OR pc.id = v_category_id
   GROUP BY
      group_date
   ORDER BY
      group_date;

$$
LANGUAGE sql
STABLE;

