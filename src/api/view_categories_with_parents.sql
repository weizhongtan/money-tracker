-- get categories and their respective parents
CREATE OR REPLACE VIEW view_categories_with_parents AS
SELECT
  c.id,
  coalesce(pc.name || ':' || c.name, c.name) AS full_name
FROM
  categories c
  LEFT JOIN categories pc ON c.parent_category_id = pc.id;

