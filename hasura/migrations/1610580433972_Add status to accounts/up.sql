CREATE
OR REPLACE VIEW "public"."view_accounts" AS WITH data AS (
  WITH data AS (
    SELECT
      accounts.initial_amount AS amount,
      accounts.id AS account_id
    FROM
      accounts
    UNION
    ALL
    SELECT
      sum(tr.amount) AS sum,
      ac_1.id AS account_id
    FROM
      (
        transactions tr
        JOIN accounts ac_1 ON ((tr.account_id = ac_1.id))
      )
    GROUP BY
      ac_1.id
  )
  SELECT
    sum(data_1.amount) AS sum,
    data_1.account_id
  FROM
    data data_1
  GROUP BY
    data_1.account_id
)
SELECT
  data.sum,
  data.account_id,
  ac.id,
  ac.legacy_key,
  ac.name,
  ac.initial_amount,
  ac.minimum,
  ac.created_at,
  ac.updated_at,
  ac.colour,
  (
    SELECT
      max(transactions.date) AS max
    FROM
      transactions
    WHERE
      (transactions.account_id = ac.id)
  ) AS most_recent_transaction_date,
  -- accounts are classed as inactive if the balance is exactly 0
  CASE
    WHEN data.sum = 0 THEN 'active'
    ELSE 'inactive'
  END AS status
FROM
  (
    data
    JOIN accounts ac ON ((data.account_id = ac.id))
  );
