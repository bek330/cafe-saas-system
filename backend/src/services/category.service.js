const db = require('../config/db');

exports.getAll = async () => {
  const result = await db.query('SELECT * FROM categories ORDER BY id');
  return result.rows;
};

exports.create = async (name, icon, image_url, public_id) => {
  const result = await db.query(
    'INSERT INTO categories (name, icon, image_url, public_id) VALUES ($1, $2, $3, $4) RETURNING *',
    [name, icon || null, image_url || null, public_id || null]
  );
  return result.rows[0];
};

exports.hasMenuItems = async (categoryId) => {
  const result = await db.query(
    'SELECT COUNT(*) FROM menu_items WHERE category_id = $1',
    [categoryId]
  );
  return result.rows[0].count > 0;
};

exports.delete = async (id) => {
  await db.query('DELETE FROM categories WHERE id = $1', [id]);
};

exports.update = async (id, data) => {
  const { name, icon, image_url, public_id } = data;
  const result = await db.query(
    'UPDATE categories SET name = $1, icon = $2, image_url = $3, public_id = $4 WHERE id = $5 RETURNING *',
    [name, icon || null, image_url || null, public_id || null, id]
  );
  return result.rows[0];
};