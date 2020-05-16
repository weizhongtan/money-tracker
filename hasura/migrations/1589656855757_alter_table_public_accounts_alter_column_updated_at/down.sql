ALTER TABLE "public"."accounts" ALTER COLUMN "updated_at" TYPE timestamp with time zone;
ALTER TABLE ONLY "public"."accounts" ALTER COLUMN "updated_at" DROP DEFAULT;
