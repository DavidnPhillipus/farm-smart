import express from 'express';
import { createLivestock } from '../controllers/livestockController';
import { authenticate, isFarmer } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/', authenticate, isFarmer, createLivestock);

export default router;