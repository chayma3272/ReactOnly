import { courseModel } from '../models/courseModel.js';

export const courseController = {
  // Get all courses
  getAll: (req, res, next) => {
    try {
      const courses = courseModel.getAll();
      res.json(courses);
    } catch (error) {
      next(error);
    }
  },

  // Get course by ID
  getById: (req, res, next) => {
    try {
      const { id } = req.params;
      const course = courseModel.getById(id);
      
      if (!course) {
        return res.status(404).json({ error: 'Course not found' });
      }

      res.json(course);
    } catch (error) {
      next(error);
    }
  },

  // Get courses by teacher
  getByTeacher: (req, res, next) => {
    try {
      const { teacherId } = req.params;
      const courses = courseModel.getByTeacherId(teacherId);
      res.json(courses);
    } catch (error) {
      next(error);
    }
  },

  // Create course
  create: (req, res, next) => {
    try {
      const courseId = courseModel.create(req.body);
      res.status(201).json({
        message: 'Course created successfully',
        courseId
      });
    } catch (error) {
      next(error);
    }
  },

  // Update course
  update: (req, res, next) => {
    try {
      const { id } = req.params;
      courseModel.update(id, req.body);
      res.json({ message: 'Course updated successfully' });
    } catch (error) {
      next(error);
    }
  },

  // Delete course
  delete: (req, res, next) => {
    try {
      const { id } = req.params;
      courseModel.delete(id);
      res.json({ message: 'Course deleted successfully' });
    } catch (error) {
      next(error);
    }
  }
};

