ALTER TABLE "public"."table_transactions_by_category_grouped" ALTER COLUMN "date" TYPE timestamptz;
ALTER TABLE "public"."table_transactions_by_category_grouped" ALTER COLUMN "date" SET NOT NULL;
