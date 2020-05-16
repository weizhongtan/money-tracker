ALTER TABLE "public"."accounts" ALTER COLUMN "created_at" TYPE timestamptz;
ALTER TABLE ONLY "public"."accounts" ALTER COLUMN "created_at" SET DEFAULT now();
