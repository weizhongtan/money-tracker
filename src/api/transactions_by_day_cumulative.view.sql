CREATE OR REPLACE FUNCTION function_transactions_by_day_cumulative (v_account_id uuid)
   RETURNS SETOF cumulative_by_day
   AS $$
   ( WITH data AS (
         -- first row should be the initial amount from the account
         SELECT
            '2000-01-01T00:00:00.000Z' AS date,
            initial_amount AS sum
         FROM
            accounts
         WHERE
            id = v_account_id
         UNION ALL
         SELECT
            date_trunc('day'::text, transactions.date) AS date,
            sum(transactions.amount) AS sum
         FROM
            transactions
         WHERE
            to_account_id = v_account_id
         GROUP BY
            transactions.date
)
      SELECT
         data.date,
         sum(data.sum) OVER (ORDER BY data.date ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS sum
      FROM
         data);

$$
LANGUAGE sql
STABLE;

