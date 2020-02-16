-- get categories and their respective parents
CREATE OR REPLACE VIEW view_categories_with_parents AS
SELECT
  c.id,
  c.name AS name,
  pc.name AS parent_category_name,
  pc.id AS parent_category_id,
  coalesce(pc.name || ':' || c.name, c.name) AS full_name,
  coalesce(pc.type, c.type) AS TYPE
FROM
  categories c
  LEFT JOIN categories pc ON c.parent_category_id = pc.id;

