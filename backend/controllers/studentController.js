import { studentModel } from '../models/studentModel.js';

export const studentController = {
  // Get all students
  getAll: (req, res, next) => {
    try {
      const students = studentModel.getAll();
      res.json(students);
    } catch (error) {
      next(error);
    }
  },

  // Get student by ID
  getById: (req, res, next) => {
    try {
      const { id } = req.params;
      const student = studentModel.getById(id);
      
      if (!student) {
        return res.status(404).json({ error: 'Student not found' });
      }

      res.json(student);
    } catch (error) {
      next(error);
    }
  },

  // Get students by course
  getByCourse: (req, res, next) => {
    try {
      const { courseId } = req.params;
      const students = studentModel.getByCourseId(courseId);
      res.json(students);
    } catch (error) {
      next(error);
    }
  },

  // Create student
  create: (req, res, next) => {
    try {
      const studentId = studentModel.create(req.body);
      res.status(201).json({
        message: 'Student created successfully',
        studentId
      });
    } catch (error) {
      next(error);
    }
  },

  // Update student
  update: (req, res, next) => {
    try {
      const { id } = req.params;
      studentModel.update(id, req.body);
      res.json({ message: 'Student updated successfully' });
    } catch (error) {
      next(error);
    }
  },

  // Delete student
  delete: (req, res, next) => {
    try {
      const { id } = req.params;
      studentModel.delete(id);
      res.json({ message: 'Student deleted successfully' });
    } catch (error) {
      next(error);
    }
  }
};

