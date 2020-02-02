-- reference table for graphql only
CREATE TABLE __transactions_group_by (
   date timestamptz,
   sum numeric(19, 2)
);

-- get the aggregate sum of transaction amounts which match a given category, grouped by a time period
CREATE OR REPLACE FUNCTION func_transactions_by_category_grouped (v_category_id uuid, v_group_by text)
   RETURNS SETOF __transactions_group_by
   AS $$
   WITH data AS (
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
         -- if the transaction category does not match, try matching against the categories parent category
         OR pc.id = v_category_id
      GROUP BY
         group_date
      ORDER BY
         group_date
)
   SELECT
      coalesce(d.group_date, s.group_date) AS group_date,
      coalesce(d.sum, 0)
   FROM (
      SELECT
         *
      FROM
         generate_series('2017-01-01 00:00'::timestamp, now(), ('1 ' || v_group_by)::interval) AS group_date) s
   LEFT JOIN data d ON d.group_date = s.group_date;

$$
LANGUAGE sql
STABLE;

