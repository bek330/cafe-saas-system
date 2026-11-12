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
    const client = await pool.connect();

    try {
      await client.query('BEGIN');

      if (role !== 'admin') {
        // Lock administrator rows so concurrent demotions/deletions cannot remove the final admin.
        const admins = await client.query(
          "SELECT id FROM users WHERE role = 'admin' FOR UPDATE"
        );
        const target = await client.query(
          'SELECT role FROM users WHERE id = $1 FOR UPDATE',
          [id]
        );

        if (target.rows.length === 0) {
          await client.query('COMMIT');
          return undefined;
        }

        if (target.rows[0].role === 'admin' && admins.rows.length <= 1) {
          const error = new Error('At least one administrator account must remain');
          error.statusCode = 409;
          throw error;
        }
      }

      let query = 'UPDATE users SET username = $1, role = $2';
      const params = [username, role];

      if (password) {
        const passwordHash = await bcrypt.hash(password, 10);
        query += ', password_hash = $3';
        params.push(passwordHash);
      }

      query += ' WHERE id = $' + (params.length + 1) + ' RETURNING id, username, role, created_at';
      params.push(id);

      const result = await client.query(query, params);
      await client.query('COMMIT');
      return result.rows[0];
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }
  }

  async deleteUser(id) {
    const client = await pool.connect();

    try {
      await client.query('BEGIN');

      // Acquire admin-row locks in a consistent order before checking the final-admin rule.
      const admins = await client.query(
        "SELECT id FROM users WHERE role = 'admin' FOR UPDATE"
      );
      const target = await client.query(
        'SELECT role FROM users WHERE id = $1 FOR UPDATE',
        [id]
      );

      if (target.rows.length === 0) {
        await client.query('COMMIT');
        return;
      }

      if (target.rows[0].role === 'admin' && admins.rows.length <= 1) {
        const error = new Error('At least one administrator account must remain');
        error.statusCode = 409;
        throw error;
      }

      await client.query('DELETE FROM users WHERE id = $1', [id]);
      await client.query('COMMIT');
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }
  }

  async getUserByUsername(username) {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    return result.rows[0];
  }
}

module.exports = new UserService();
