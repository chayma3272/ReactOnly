import db from '../db/connection.js';

export const userModel = {
  // Get all users
  getAll: () => {
    return db.prepare('SELECT * FROM users').all();
  },

  // Get user by ID
  getById: (id) => {
    return db.prepare('SELECT * FROM users WHERE id = ?').get(id);
  },

  // Get user by email
  getByEmail: (email) => {
    return db.prepare('SELECT * FROM users WHERE email = ?').get(email);
  },

  // Create user
  create: (userData) => {
    const { name, email, password, role } = userData;
    const result = db.prepare(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)'
    ).run(name, email, password, role);
    return result.lastInsertRowid;
  },

  // Update user
  update: (id, userData) => {
    const { name, email, role } = userData;
    return db.prepare(
      'UPDATE users SET name = ?, email = ?, role = ? WHERE id = ?'
    ).run(name, email, role, id);
  },

  // Delete user
  delete: (id) => {
    return db.prepare('DELETE FROM users WHERE id = ?').run(id);
  }
};

