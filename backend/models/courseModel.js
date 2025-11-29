import db from '../db/connection.js';

export const courseModel = {
  // Get all courses
  getAll: () => {
    return db.prepare('SELECT * FROM courses').all();
  },

  // Get course by ID
  getById: (id) => {
    return db.prepare('SELECT * FROM courses WHERE id = ?').get(id);
  },

  // Get courses by teacher ID
  getByTeacherId: (teacherId) => {
    return db.prepare('SELECT * FROM courses WHERE teacher_id = ?').all(teacherId);
  },

  // Create course
  create: (courseData) => {
    const { title, description, teacher_id, category, level } = courseData;
    const result = db.prepare(
      'INSERT INTO courses (title, description, teacher_id, category, level) VALUES (?, ?, ?, ?, ?)'
    ).run(title, description, teacher_id, category, level);
    return result.lastInsertRowid;
  },

  // Update course
  update: (id, courseData) => {
    const { title, description, category, level } = courseData;
    return db.prepare(
      'UPDATE courses SET title = ?, description = ?, category = ?, level = ? WHERE id = ?'
    ).run(title, description, category, level, id);
  },

  // Delete course
  delete: (id) => {
    return db.prepare('DELETE FROM courses WHERE id = ?').run(id);
  }
};

