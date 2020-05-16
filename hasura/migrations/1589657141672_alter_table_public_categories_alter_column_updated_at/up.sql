ALTER TABLE "public"."categories" ALTER COLUMN "updated_at" TYPE timestamptz;
ALTER TABLE ONLY "public"."categories" ALTER COLUMN "updated_at" SET DEFAULT now();
