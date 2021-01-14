CREATE OR REPLACE FUNCTION public.func_transactions_by_account_grouped_cumulative(v_account_id uuid, v_group_by text, v_start_date timestamp with time zone)
 RETURNS SETOF table_transactions_group_by
 LANGUAGE sql
 STABLE
AS $function$
   WITH data AS (
      -- first row should be the initial amount from the account
      -- date is equal to the given start date
      SELECT
         CASE
         -- if v_account_id is not provided, create one record with the sum total of all initial accounts
         WHEN v_account_id IS NULL THEN
            date_trunc(v_group_by, v_start_date)
         ELSE
            v_start_date
         END AS group_date,
         initial_amount AS sum
      FROM
         accounts
      WHERE
         v_account_id IS NULL
         OR id = v_account_id
      UNION ALL
      SELECT
         -- group transactions by time period
         date_trunc(v_group_by, transactions.date) AS group_date,
         sum(transactions.amount) AS sum
      FROM
         transactions
      WHERE
         -- if v_account_id is not provided, match all transactions
         v_account_id IS NULL
         OR account_id = v_account_id
      GROUP BY
         group_date
)
   SELECT
      data.group_date,
      -- for each row, add all previous rows to its sum value (cumulative)
      sum(data.sum) OVER (ORDER BY data.group_date ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS sum
   FROM
      data;

$function$;
