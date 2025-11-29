import db from '../db/connection.js';

export const activityModel = {
  // Get all activities
  getAll: () => {
    return db.prepare('SELECT * FROM activities ORDER BY created_at DESC').all();
  },

  // Get activity by ID
  getById: (id) => {
    return db.prepare('SELECT * FROM activities WHERE id = ?').get(id);
  },

  // Get activities by student ID
  getByStudentId: (studentId) => {
    return db.prepare(
      'SELECT * FROM activities WHERE student_id = ? ORDER BY created_at DESC'
    ).all(studentId);
  },

  // Get activities by course ID
  getByCourseId: (courseId) => {
    return db.prepare(
      'SELECT * FROM activities WHERE course_id = ? ORDER BY created_at DESC'
    ).all(courseId);
  },

  // Create activity
  create: (activityData) => {
    const { student_id, course_id, type, description } = activityData;
    const result = db.prepare(
      'INSERT INTO activities (student_id, course_id, type, description) VALUES (?, ?, ?, ?)'
    ).run(student_id, course_id, type, description);
    return result.lastInsertRowid;
  },

  // Update activity
  update: (id, activityData) => {
    const { type, description } = activityData;
    return db.prepare(
      'UPDATE activities SET type = ?, description = ? WHERE id = ?'
    ).run(type, description, id);
  },

  // Delete activity
  delete: (id) => {
    return db.prepare('DELETE FROM activities WHERE id = ?').run(id);
  }
};

