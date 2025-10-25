import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

// Routes
import authRoutes from './routes/authRoutes';
import cropRoutes from './routes/cropRoutes';
import livestockRoutes from './routes/livestockRoutes';
import listingRoutes from './routes/listingRoutes';
import cartRoutes from './routes/cartRoutes';
import orderRoutes from './routes/orderRoutes';
import statsRoutes from './routes/statsRoutes';
import activityRoutes from './routes/activityRoutes';
import inventoryRoutes from './routes/InventoryRoute';
import notificationRoutes from './routes/notificationRoutes';

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Attach prisma to req
app.use((req, _res, next) => {
  (req as any).prisma = prisma;
  next();
});

// Test endpoint
app.get('/api/test', (_req, res) => {
  res.json({ message: 'Server is running' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/crops', cropRoutes);
app.use('/api/livestock', livestockRoutes);
app.use('/api/listings', listingRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/notifications', notificationRoutes);

// Error handling middleware
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({ message: 'Internal server error', error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))