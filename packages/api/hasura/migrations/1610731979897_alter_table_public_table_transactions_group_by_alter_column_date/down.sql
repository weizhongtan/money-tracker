ALTER TABLE "public"."table_transactions_group_by" ALTER COLUMN "date" TYPE timestamp with time zone;
ALTER TABLE "public"."table_transactions_group_by" ADD CONSTRAINT "table_transactions_group_by_date_key" UNIQUE ("date");
