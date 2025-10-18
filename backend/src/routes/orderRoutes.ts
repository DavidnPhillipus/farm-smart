import express from 'express';
import { createOrder, getOrders, updateOrderStatus } from '../controllers/orderController';
import { authenticate, isBuyer } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/', authenticate, isBuyer, createOrder);
router.get('/', authenticate, isBuyer, getOrders);
router.patch('/:id', authenticate, isBuyer, updateOrderStatus);

export default router;
