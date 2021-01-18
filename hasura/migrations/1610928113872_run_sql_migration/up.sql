CREATE
OR REPLACE FUNCTION public.cumulative_amount(
  v_account_id uuid,
  v_group_by text,
  v_start_date timestamp with time zone,
  v_end_date timestamp with time zone
) RETURNS SETOF table_cumulative_amount LANGUAGE sql STABLE AS $function$ WITH data AS (
  -- first row should be the initial amount from the account
  -- date is equal to the given start date
  SELECT
    -- create one record with the sum total of all initial accounts, on the start date of the result
    date_trunc('day', v_start_date) AS group_date,
    sum(initial_amount) AS sum
  FROM
    account
  WHERE
    v_account_id IS NULL
    OR id = v_account_id
  GROUP BY
    group_date
  UNION
  ALL
  SELECT
    -- group transactions by time period
    date_trunc(v_group_by, transaction.date) AS group_date,
    sum(transaction.amount) AS sum
  FROM
    transaction
  WHERE
    -- if v_account_id is not provided, match all transactions
    v_account_id IS NULL
    OR account_id = v_account_id
  GROUP BY
    group_date
  UNION
  ALL
  SELECT
    -- create a dummy record, providing the sum at the end of the time period
    date_trunc('day', v_end_date) AS group_date,
    0 as sum
)
SELECT
  data.group_date,
  -- for each row, add all previous rows to its sum value (cumulative)
  sum(data.sum) OVER (
    ORDER BY
      data.group_date ROWS BETWEEN UNBOUNDED PRECEDING
      AND CURRENT ROW
  ) AS sum
FROM
  data;

$function$;
