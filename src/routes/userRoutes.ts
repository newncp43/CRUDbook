import { Router } from 'express';
import { getAllUsers } from '../controllers/userController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

router.get('/users', protect, getAllUsers);

export default router;
