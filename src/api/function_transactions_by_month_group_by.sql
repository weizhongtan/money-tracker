CREATE OR REPLACE FUNCTION function_transactions_by_day_cumulative (v_account_id uuid)
   RETURNS SETOF cumulative_by_day
   AS $$
   ( WITH data AS (
moneytracker=# select sum(amount) as amount, date_trunc('month'::text, date) as month from transactions where category_id = v_category_id group by month order by month;

$$
LANGUAGE sql
STABLE;

