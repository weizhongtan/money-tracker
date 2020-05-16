ALTER TABLE "public"."accounts" ALTER COLUMN "created_at" TYPE timestamp with time zone;
ALTER TABLE ONLY "public"."accounts" ALTER COLUMN "created_at" DROP DEFAULT;
