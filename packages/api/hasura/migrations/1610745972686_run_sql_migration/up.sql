CREATE OR REPLACE FUNCTION func_transaction_sign(transaction_row transactions)
RETURNS BOOLEAN AS $$
  SELECT transaction_row.amount > 0
$$ LANGUAGE sql STABLE;
