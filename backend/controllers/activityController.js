import { activityModel } from '../models/activityModel.js';

export const activityController = {
  // Get all activities
  getAll: (req, res, next) => {
    try {
      const activities = activityModel.getAll();
      res.json(activities);
    } catch (error) {
      next(error);
    }
  },

  // Get activity by ID
  getById: (req, res, next) => {
    try {
      const { id } = req.params;
      const activity = activityModel.getById(id);
      
      if (!activity) {
        return res.status(404).json({ error: 'Activity not found' });
      }

      res.json(activity);
    } catch (error) {
      next(error);
    }
  },

  // Get activities by student
  getByStudent: (req, res, next) => {
    try {
      const { studentId } = req.params;
      const activities = activityModel.getByStudentId(studentId);
      res.json(activities);
    } catch (error) {
      next(error);
    }
  },

  // Get activities by course
  getByCourse: (req, res, next) => {
    try {
      const { courseId } = req.params;
      const activities = activityModel.getByCourseId(courseId);
      res.json(activities);
    } catch (error) {
      next(error);
    }
  },

  // Create activity
  create: (req, res, next) => {
    try {
      const activityId = activityModel.create(req.body);
      res.status(201).json({
        message: 'Activity created successfully',
        activityId
      });
    } catch (error) {
      next(error);
    }
  },

  // Update activity
  update: (req, res, next) => {
    try {
      const { id } = req.params;
      activityModel.update(id, req.body);
      res.json({ message: 'Activity updated successfully' });
    } catch (error) {
      next(error);
    }
  },

  // Delete activity
  delete: (req, res, next) => {
    try {
      const { id } = req.params;
      activityModel.delete(id);
      res.json({ message: 'Activity deleted successfully' });
    } catch (error) {
      next(error);
    }
  }
};

