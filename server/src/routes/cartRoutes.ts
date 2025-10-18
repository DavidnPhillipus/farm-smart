import express from 'express';
import { getCart, addToCart, updateQuantity, removeFromCart } from '../controllers/cartController';
import { authenticate, isBuyer } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', authenticate, isBuyer, getCart);
router.post('/add', authenticate, isBuyer, addToCart);
router.patch('/:id', authenticate, isBuyer, updateQuantity);
router.delete('/:id', authenticate, isBuyer, removeFromCart);

export default router