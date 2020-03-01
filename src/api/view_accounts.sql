CREATE OR REPLACE VIEW view_accounts AS
WITH data AS (
  WITH data AS (
    SELECT
      initial_amount AS amount,
      id AS account_id
    FROM
      accounts
    UNION ALL
    SELECT
      sum(amount),
      ac.id AS account_id
    FROM
      transactions tr
      INNER JOIN accounts ac ON tr.to_account_id = ac.id
    GROUP BY
      account_id
)
  SELECT
    sum(amount),
    account_id
  FROM
    data
  GROUP BY
    account_id
)
SELECT
  *
FROM
  data
  INNER JOIN accounts ac ON data.account_id = ac.id;

