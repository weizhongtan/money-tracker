-- reference table for graphql only
CREATE TABLE __category_by_date_type (
  name text,
  sum numeric(19, 2)
);

-- get the sum of all transactions
-- - in a given time period
-- - which match a category type (income/expense)
-- - which match a category level (parent/child)

CREATE OR REPLACE FUNCTION func_category_by_date_type (v_start_date timestamp, v_end_date timestamp, v_account_id text, v_category_type text, v_parent boolean)
  RETURNS SETOF __category_by_date_type
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

