import express from 'express';
import { getNotifications, markNotificationRead } from '../controllers/notificationController';
import { authenticate, isFarmer } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', authenticate, isFarmer, getNotifications);
router.patch('/:id/read', authenticate, isFarmer, markNotificationRead);

export default router;