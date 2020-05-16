ALTER TABLE "public"."categories" ALTER COLUMN "updated_at" TYPE timestamp with time zone;
ALTER TABLE ONLY "public"."categories" ALTER COLUMN "updated_at" DROP DEFAULT;
