import { Router } from 'express';
import {
  createPerformance,
  getAllPerformances,
  getPerformanceById,
  updatePerformance,
  deletePerformance,
} from '../controllers/performanceController.js';

const router = Router();

router.post('/', createPerformance);

router.get('/', getAllPerformances);

router.get('/:id', getPerformanceById);

router.put('/:id', updatePerformance);

router.delete('/:id', deletePerformance);

export default router;
