import express from 'express';
import { getUploadUrl } from '../controllers/uploadController';
import { authenticate } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/url', authenticate, getUploadUrl);

export default router;