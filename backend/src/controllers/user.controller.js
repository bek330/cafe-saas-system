const userService = require('../services/user.service');

class UserController {
  async getAllUsers(req, res, next) {
    try {
      const users = await userService.getAllUsers();
      res.json(users);
    } catch (err) {
      next(err);
    }
  }

  async getUserById(req, res, next) {
    try {
      const { id } = req.params;
      const user = await userService.getUserById(id);
      if (!user) {
        const error = new Error('User not found');
        error.statusCode = 404;
        throw error;
      }
      res.json(user);
    } catch (err) {
      next(err);
    }
  }

  async createUser(req, res, next) {
    try {
      const { username, password, role } = req.body;

      if (!username || !password || !role) {
        const error = new Error('Username, password, and role are required');
        error.statusCode = 400;
        throw error;
      }

      if (!['admin', 'user'].includes(role)) {
        const error = new Error('Role must be admin or user');
        error.statusCode = 400;
        throw error;
      }

      const existingUser = await userService.getUserByUsername(username);
      if (existingUser) {
        const error = new Error('Username already exists');
        error.statusCode = 409;
        throw error;
      }

      const user = await userService.createUser(username, password, role);
      res.status(201).json(user);
    } catch (err) {
      next(err);
    }
  }

  async updateUser(req, res, next) {
    try {
      const { id } = req.params;
      const { username, password, role } = req.body;

      if (!username || !role) {
        const error = new Error('Username and role are required');
        error.statusCode = 400;
        throw error;
      }

      if (!['admin', 'user'].includes(role)) {
        const error = new Error('Role must be admin or user');
        error.statusCode = 400;
        throw error;
      }

      const existingUser = await userService.getUserByUsername(username);
      if (existingUser && existingUser.id !== parseInt(id)) {
        const error = new Error('Username already exists');
        error.statusCode = 409;
        throw error;
      }

      const user = await userService.updateUser(id, username, password, role);
      if (!user) {
        const error = new Error('User not found');
        error.statusCode = 404;
        throw error;
      }
      res.json(user);
    } catch (err) {
      next(err);
    }
  }

  async deleteUser(req, res, next) {
    try {
      const { id } = req.params;
      const user = await userService.getUserById(id);
      if (!user) {
        const error = new Error('User not found');
        error.statusCode = 404;
        throw error;
      }

      await userService.deleteUser(id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new UserController();
