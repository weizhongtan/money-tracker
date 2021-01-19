CREATE
OR REPLACE FUNCTION public.func_breakdown(
  v_start_date timestamp WITH time zone,
  v_end_date timestamp WITH time zone,
  v_category_type text,
  v_group_categories boolean
) RETURNS SETOF table_breakdown LANGUAGE SQL STABLE AS $$ WITH data AS(
  WITH data AS (
    SELECT
      c.id,
      CASE
        v_group_categories -- parses parent category name, otherwise just use category name
        WHEN TRUE THEN coalesce(
          substring(
            c.name
            FROM
              '(.*):'
          ),
          c.name
        )
        ELSE c.name
      END AS name,
      c.type,
      t.amount
    FROM
      transaction t
      INNER JOIN category c ON t.category_id = c.id
    WHERE
      c.type = v_category_type
      AND t.date >= v_start_date
      AND t.date <= v_end_date
  )
  SELECT
    name,
    sum(amount) AS sum
  FROM
    data
  GROUP BY
    name
)
SELECT
  c.id,
  d.name,
  sum
FROM
  data d
  LEFT JOIN category c ON c.name = d.name;
$$;
