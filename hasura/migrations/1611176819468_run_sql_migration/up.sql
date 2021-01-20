CREATE OR REPLACE FUNCTION public.func_category_breakdown(v_start_date timestamp with time zone, v_end_date timestamp with time zone, v_category_type text, v_group_categories boolean)
 RETURNS SETOF category
 LANGUAGE sql
 STABLE
AS $function$ WITH data AS(
  WITH data AS (
    SELECT
      CASE
        v_group_categories -- parses parent category name, otherwise just use category name
        WHEN TRUE THEN coalesce(
          pc.id,
          c.id
        )
        ELSE c.id
      END AS category_id,
      coalesce(pc.type, c.type) as category_type,
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
    category_id as id,
    sum(amount) AS sum
  FROM
    data
  WHERE
    category_type = v_category_type
  GROUP BY
    id
)
SELECT
  d.id,
  NULL as legacy_key,
  c.name,
  NULL as type,
  now() as created_at,
  now() as updated_at,
  NULL::uuid as parent_category_id,
  d.sum
FROM
  data d
  LEFT JOIN category c ON c.id = d.id
ORDER BY
  d.sum ASC;
$function$;
