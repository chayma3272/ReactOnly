import db from '../db/connection.js';

export const studentModel = {
  // Get all students
  getAll: () => {
    return db.prepare('SELECT * FROM students').all();
  },

  // Get student by ID
  getById: (id) => {
    return db.prepare('SELECT * FROM students WHERE id = ?').get(id);
  },

  // Get students by course ID
  getByCourseId: (courseId) => {
    return db.prepare(
      'SELECT s.* FROM students s INNER JOIN enrollments e ON s.id = e.student_id WHERE e.course_id = ?'
    ).all(courseId);
  },

  // Create student
  create: (studentData) => {
    const { name, email, user_id } = studentData;
    const result = db.prepare(
      'INSERT INTO students (name, email, user_id) VALUES (?, ?, ?)'
    ).run(name, email, user_id);
    return result.lastInsertRowid;
  },

  // Update student
  update: (id, studentData) => {
    const { name, email } = studentData;
    return db.prepare(
      'UPDATE students SET name = ?, email = ? WHERE id = ?'
    ).run(name, email, id);
  },

  // Delete student
  delete: (id) => {
    return db.prepare('DELETE FROM students WHERE id = ?').run(id);
  }
};

