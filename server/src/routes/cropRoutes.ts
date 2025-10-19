import express from 'express';
import { createCrop } from '../controllers/cropController';
import { authenticate, isFarmer } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/', authenticate, isFarmer, createCrop);

export default router;