const db = require('../config/db');

exports.getAll = async () => {
  const result = await db.query('SELECT * FROM categories ORDER BY id');
  return result.rows;
};

exports.create = async (name) => {
  const result = await db.query(
    'INSERT INTO categories (name) VALUES ($1) RETURNING *',
    [name]
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