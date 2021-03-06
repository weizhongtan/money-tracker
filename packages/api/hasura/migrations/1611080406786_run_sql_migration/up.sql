CREATE
OR REPLACE FUNCTION public.func_breakdown(
  v_start_date timestamp with time zone,
  v_end_date timestamp with time zone,
  v_category_type text
) RETURNS SETOF table_breakdown LANGUAGE sql STABLE AS $$ WITH data AS (
  SELECT
    CASE
      v_category_type -- parses parent category name, otherwise just use category name
      WHEN 'parent' THEN coalesce(
        substring(
          c.name
          FROM
            '(.*):'
        ),
        c.name
      )
      ELSE c.name
    END AS name,
    t.amount
  FROM
    transaction t
    INNER JOIN category c ON t.category_id = c.id
    LEFT JOIN category pc ON c.parent_category_id = pc.id
  WHERE
    t.date >= v_start_date
    AND t.date <= v_end_date
)
SELECT
  name,
  sum(amount) as sum
FROM
  data
GROUP BY
  name;

$$;
