-- reference table for graphql only
CREATE TABLE __categories_group_by (
  name text,
  sum numeric(19, 2)
);

CREATE OR REPLACE FUNCTION func_category_by_date_type (v_start_date timestamptz, v_end_date timestamptz, v_category_type text, v_parent boolean)
  RETURNS SETOF __categories_group_by
  AS $$
  WITH data AS (
    SELECT
      t.amount,
      CASE v_parent
      WHEN TRUE THEN
        coalesce(pc.name, c.name)
      ELSE
        c.name
      END AS category_name,
      coalesce(pc.type, c.type) AS category_type
    FROM
      transactions t
      INNER JOIN categories c ON t.category_id = c.id
      LEFT JOIN categories pc ON c.parent_category_id = pc.id
    WHERE
      t.date >= v_start_date
      AND t.date <= v_end_date
      AND coalesce(pc.type, c.type) = v_category_type
)
  SELECT
    data.category_name,
    sum(data.amount)
  FROM
    data
  GROUP BY
    data.category_name;

$$
LANGUAGE sql
STABLE;

