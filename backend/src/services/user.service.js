const pool = require('../config/db');
const bcrypt = require('bcrypt');

class UserService {
  async getAllUsers() {
    const result = await pool.query('SELECT id, username, role, created_at FROM users ORDER BY created_at DESC');
    return result.rows;
  }

  async getUserById(id) {
    const result = await pool.query('SELECT id, username, role, created_at FROM users WHERE id = $1', [id]);
    return result.rows[0];
  }

  async createUser(username, password, role) {
    const passwordHash = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (username, password_hash, role) VALUES ($1, $2, $3) RETURNING id, username, role, created_at',
      [username, passwordHash, role]
    );
    return result.rows[0];
  }

  async updateUser(id, username, password, role) {
    let query = 'UPDATE users SET username = $1, role = $2';
    let params = [username, role];

    if (password) {
      const passwordHash = await bcrypt.hash(password, 10);
      query += ', password_hash = $3';
      params.push(passwordHash);
    }

    query += ' WHERE id = $' + (params.length + 1) + ' RETURNING id, username, role, created_at';
    params.push(id);

    const result = await pool.query(query, params);
    return result.rows[0];
  }

  async deleteUser(id) {
    await pool.query('DELETE FROM users WHERE id = $1', [id]);
  }

  async getUserByUsername(username) {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    return result.rows[0];
  }
}

module.exports = new UserService();