import express from 'express';
import { getFarmerStats, getBuyerStats } from '../controllers/statsController';
import { authenticate, isFarmer, isBuyer } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/farmer', authenticate, isFarmer, getFarmerStats);
router.get('/buyer', authenticate, isBuyer, getBuyerStats);

export default router;