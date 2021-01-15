ALTER TABLE "public"."table_transactions_by_category_grouped" ALTER COLUMN "date" TYPE timestamp with time zone;
ALTER TABLE "public"."table_transactions_by_category_grouped" ALTER COLUMN "date" DROP NOT NULL;
