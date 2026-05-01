const db = require('../config/db');

exports.getAll = async () => {
  const result = await db.query('SELECT * FROM categories ORDER BY id');
  return result.rows;
};

exports.create = async (name, icon) => {
  try {
    const result = await db.query(
      'INSERT INTO categories (name, icon) VALUES ($1, $2) RETURNING *',
      [name, icon || null]
    );
    return result.rows[0];
  } catch (err) {
    if (err.code === '42703') {
      const result = await db.query(
        'INSERT INTO categories (name) VALUES ($1) RETURNING *',
        [name]
      );
      return result.rows[0];
    }
    throw err;
  }
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
  const { name, icon } = data;
  try {
    const result = await db.query(
      'UPDATE categories SET name = $1, icon = $2 WHERE id = $3 RETURNING *',
      [name, icon || null, id]
    );
    return result.rows[0];
  } catch (err) {
    if (err.code === '42703') {
      const result = await db.query(
        'UPDATE categories SET name = $1 WHERE id = $2 RETURNING *',
        [name, id]
      );
      return result.rows[0];
    }
    throw err;
  }
};