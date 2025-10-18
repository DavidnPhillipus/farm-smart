import express from 'express';
import { getActivities } from '../controllers/activityController';
import { authenticate, isFarmer } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', authenticate, isFarmer, getActivities);

export default router;