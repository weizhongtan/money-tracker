CREATE OR REPLACE VIEW "public"."view_accounts" AS 
 WITH data AS (
         WITH data AS (
                 SELECT accounts.initial_amount AS amount,
                    accounts.id AS account_id
                   FROM accounts
                UNION ALL
                 SELECT sum(tr.amount) AS sum,
                    ac_1.id AS account_id
                   FROM (transactions tr
                     JOIN accounts ac_1 ON ((tr.to_account_id = ac_1.id)))
                  GROUP BY ac_1.id
                )
         SELECT sum(data_1.amount) AS sum,
            data_1.account_id
           FROM data data_1
          GROUP BY data_1.account_id
        )
 SELECT data.sum,
    data.account_id,
    ac.id,
    ac.legacy_key,
    ac.name,
    ac.initial_amount,
    ac.minimum,
    '2019-11-15 12:00:00+00'::timestamptz as created_at,
    '2019-11-15 12:00:00+00'::timestamptz as updated_at,
    ac.colour
   FROM (data
     JOIN accounts ac ON ((data.account_id = ac.id)));
