import { userModel } from '../models/userModel.js';

export const userController = {
  // Get all users
  getAll: (req, res, next) => {
    try {
      const users = userModel.getAll();
      res.json(users);
    } catch (error) {
      next(error);
    }
  },

  // Get user by ID
  getById: (req, res, next) => {
    try {
      const { id } = req.params;
      const user = userModel.getById(id);
      
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json(user);
    } catch (error) {
      next(error);
    }
  },

  // Create user
  create: (req, res, next) => {
    try {
      const userId = userModel.create(req.body);
      res.status(201).json({
        message: 'User created successfully',
        userId
      });
    } catch (error) {
      next(error);
    }
  },

  // Update user
  update: (req, res, next) => {
    try {
      const { id } = req.params;
      userModel.update(id, req.body);
      res.json({ message: 'User updated successfully' });
    } catch (error) {
      next(error);
    }
  },

  // Delete user
  delete: (req, res, next) => {
    try {
      const { id } = req.params;
      userModel.delete(id);
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      next(error);
    }
  }
};

