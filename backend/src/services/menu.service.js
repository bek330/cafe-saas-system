const db = require('../config/db');
const cloudinary = require('../config/cloudinary');

// 🔥 FIXED: handles folders + version correctly
const getPublicIdFromUrl = (url) => {
  if (!url) return null;

  try {
    const parts = url.split('/upload/')[1]; // after upload/
    const withoutVersion = parts.replace(/^v\d+\//, ''); // remove v123456/
    const publicId = withoutVersion.split('.')[0]; // remove extension

    return publicId;
  } catch (err) {
    console.error("Public ID parse error:", err);
    return null;
  }
};

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
  const { name, description, price, image_url, category_id, public_id } = data;

  const result = await db.query(
    `INSERT INTO menu_items 
     (name, description, price, image_url, category_id, public_id)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [name, description, price, image_url, category_id, public_id]
  );

  return result.rows[0];
};

exports.update = async (id, data) => {
  const { name, description, price, image_url, category_id, public_id } = data;

  // 1. Get old public_id
  const old = await db.query(
    `SELECT public_id FROM menu_items WHERE id = $1`,
    [id]
  );

  const oldPublicId = old.rows[0]?.public_id;

  // 2. Delete old image if changed
  if (public_id && oldPublicId && public_id !== oldPublicId) {
    const result = await cloudinary.uploader.destroy(oldPublicId);
    console.log("DELETE RESULT:", result);
  }

  // 3. Update DB
  const result = await db.query(
    `UPDATE menu_items
     SET name=$1, description=$2, price=$3, image_url=$4, category_id=$5, public_id=$6
     WHERE id=$7
     RETURNING *`,
    [name, description, price, image_url, category_id, public_id, id]
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

exports.remove = async (id) => {
  const item = await db.query(
    `SELECT image_url FROM menu_items WHERE id = $1`,
    [id]
  );

  const url = item.rows[0]?.public_id;

  const publicId = getPublicIdFromUrl(url);
  if (publicId) {
    const result = await cloudinary.uploader.destroy(publicId);
    console.log("DELETE RESULT:", result);
  }


  await db.query(
    `DELETE FROM menu_items WHERE id = $1`,
    [id]
  );

  return { message: "Deleted" };
};