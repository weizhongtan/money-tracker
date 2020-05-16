ALTER TABLE "public"."categories" ALTER COLUMN "created_at" TYPE timestamp with time zone;
ALTER TABLE ONLY "public"."categories" ALTER COLUMN "created_at" DROP DEFAULT;
