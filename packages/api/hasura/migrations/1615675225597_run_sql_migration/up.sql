CREATE OR REPLACE FUNCTION public.func_timeline(v_account_id uuid, v_category_ids uuid[], v_group_by text)
 RETURNS SETOF table_amount_group
 LANGUAGE sql
 STABLE
AS $function$ WITH raw_data AS (
  SELECT
    t.date,
    t.amount AS balance,
    CASE
      c.type
      WHEN 'expense' THEN t.amount
      ELSE 0
    END AS expense,
    CASE
      c.type
      WHEN 'income' THEN t.amount
      ELSE 0
    END AS income
  FROM
    transaction t
    INNER JOIN category c ON t.category_id = c.id
    LEFT JOIN category pc ON c.parent_category_id = pc.id
  WHERE
    (
      -- if v_account_id is not provided, do not show internal transfers
      (
        v_account_id IS NULL
        AND c.name != 'Internal Transfer'
      )
      OR t.account_id = v_account_id
    )
    AND (
      -- if v_category_ids is empty, match all rows
      array_length(v_category_ids, 1) = 0
      OR c.id = ANY (v_category_ids)
      OR pc.id = ANY (v_category_ids)
    )
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
FROM
  (
    SELECT
      *
    FROM
      generate_series(
        '2017-01-01 00:00' :: timestamptz,
        NOW() :: timestamptz,
        ('1 ' || v_group_by) :: INTERVAL
      ) AS group_date
  ) s
  LEFT JOIN grouped_data d ON d.group_date = s.group_date;

$function$;
