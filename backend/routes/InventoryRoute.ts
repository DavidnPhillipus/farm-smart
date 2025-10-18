import express from 'express';
import { getInventory, toggleListing } from '../controllers/inventoryController';
import { authenticate, isFarmer } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', authenticate, isFarmer, getInventory);
router.post('/toggle', authenticate, isFarmer, toggleListing);

export default router;