import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { userModel } from '../models/userModel.js';

export const authController = {
  // Register new user
  register: async (req, res, next) => {
    try {
      const { name, email, password, role } = req.body;

      // Check if user exists
      const existingUser = userModel.getByEmail(email);
      if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user
      const userId = userModel.create({
        name,
        email,
        password: hashedPassword,
        role: role || 'student'
      });

      res.status(201).json({
        message: 'User created successfully',
        userId
      });
    } catch (error) {
      next(error);
    }
  },

  // Login
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      // Find user
      const user = userModel.getByEmail(email);
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Check password
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Generate token
      const token = jwt.sign(
        { userId: user.id, role: user.role },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '24h' }
      );

      res.json({
        message: 'Login successful',
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      });
    } catch (error) {
      next(error);
    }
  }
};

