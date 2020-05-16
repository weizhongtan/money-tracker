ALTER TABLE "public"."accounts" ALTER COLUMN "updated_at" TYPE timestamptz;
ALTER TABLE ONLY "public"."accounts" ALTER COLUMN "updated_at" SET DEFAULT now();
