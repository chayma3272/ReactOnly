import express from 'express';
import { activityController } from '../controllers/activityController.js';

const router = express.Router();

router.get('/', activityController.getAll);
router.get('/:id', activityController.getById);
router.get('/student/:studentId', activityController.getByStudent);
router.get('/course/:courseId', activityController.getByCourse);
router.post('/', activityController.create);
router.put('/:id', activityController.update);
router.delete('/:id', activityController.delete);

export default router;

