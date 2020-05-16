ALTER TABLE "public"."categories" ALTER COLUMN "created_at" TYPE timestamptz;
ALTER TABLE ONLY "public"."categories" ALTER COLUMN "created_at" SET DEFAULT now();
