import { Router } from 'express';
import {
  register,
  login,
  verifyToken,
  checkRole,
  getCurrentUser,
  updateUser,
  updateRole,
  logout,
} from '../controllers/userController.js';

const router = Router();

router.post('/register', register);

router.post('/login', login);

router.post('/update-role', verifyToken, checkRole('admin'), updateRole);

router.get('/me', verifyToken, getCurrentUser);

router.put('/update', verifyToken, updateUser);

router.post('/logout', verifyToken, logout);

export default router;
