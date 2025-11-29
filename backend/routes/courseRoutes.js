import express from 'express';
import { courseController } from '../controllers/courseController.js';

const router = express.Router();

router.get('/', courseController.getAll);
router.get('/:id', courseController.getById);
router.get('/teacher/:teacherId', courseController.getByTeacher);
router.post('/', courseController.create);
router.put('/:id', courseController.update);
router.delete('/:id', courseController.delete);

export default router;

