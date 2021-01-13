ALTER TABLE ONLY "public"."transactions" ALTER COLUMN "category_id" DROP DEFAULT;
ALTER TABLE "public"."transactions" ALTER COLUMN "category_id" DROP NOT NULL;
