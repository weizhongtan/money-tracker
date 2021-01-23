ALTER TABLE "public"."table_transactions_group_by" ALTER COLUMN "date" TYPE date;
ALTER TABLE "public"."table_transactions_group_by" DROP CONSTRAINT "table_transactions_group_by_date_key";
