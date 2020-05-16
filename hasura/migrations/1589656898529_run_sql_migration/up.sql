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
    ac.created_at,
    ac.updated_at,
    ac.colour
   FROM (data
     JOIN accounts ac ON ((data.account_id = ac.id)));
