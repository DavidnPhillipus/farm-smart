import express from 'express';
import { getListings } from '../controllers/listingController';
import { authenticate, isBuyer } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', authenticate, isBuyer, getListings);

export default router