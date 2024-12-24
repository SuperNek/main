import { Router } from 'express';
import {
  createSchedule,
  getAllSchedules,
  getScheduleById,
  updateSchedule,
  deleteSchedule,
} from '../controllers/scheduleController.js';

const router = Router();

// POST /api/schedules
router.post('/', createSchedule);

// GET /api/schedules
router.get('/', getAllSchedules);

// GET /api/schedules/:id
router.get('/:id', getScheduleById);

// PUT /api/schedules/:id
router.put('/:id', updateSchedule);

// DELETE /api/schedules/:id
router.delete('/:id', deleteSchedule);

export default router;
    