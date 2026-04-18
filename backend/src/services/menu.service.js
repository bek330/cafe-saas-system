const db = require('../config/db');

exports.getAll = async () => {
  const result = await db.query(
    `SELECT * FROM menu_items ORDER BY id DESC`
  );

  return result.rows;
};

exports.getByCategory = async (categoryId) => {
  const result = await db.query(
    `SELECT * FROM menu_items 
     WHERE category_id = $1 AND is_available = true
     ORDER BY id`,
    [categoryId]
  );

  return result.rows;
};

exports.create = async (data) => {
  const { name, description, price, image_url, category_id } = data;

  const result = await db.query(
    `INSERT INTO menu_items 
     (name, description, price, image_url, category_id)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [name, description, price, image_url, category_id]
  );

  return result.rows[0];
};

exports.update = async (id, data) => {
  const { name, description, price, image_url, category_id } = data;

  const result = await db.query(
    `UPDATE menu_items
     SET name=$1, description=$2, price=$3, image_url=$4, category_id=$5
     WHERE id=$6
     RETURNING *`,
    [name, description, price, image_url, category_id, id]
  );

  return result.rows[0];
};

exports.toggleAvailability = async (id) => {
  const result = await db.query(
    `UPDATE menu_items
     SET is_available = NOT is_available
     WHERE id = $1
     RETURNING *`,
    [id]
  );

  return result.rows[0];
};