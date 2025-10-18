import express from 'express';
import { createLivestock } from './livestockController';
import { authenticate, isFarmer } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/', authenticate, isFarmer, createLivestock);

export default router;
```

**src/controllers/listingController.ts**
```typescript
import { Request, Response } from 'express';

export const getListings = async (req: Request, res: Response) => {
  const prisma = (req as any).prisma;
  const { searchTerm, category } = req.query;

  const where: any = {};
  if (searchTerm) where.name = { contains: searchTerm as string, mode: 'insensitive' };
  if (category && category !== 'All') where.category = category as string;

  const listings = await prisma.listing.findMany({ where, include: { crop: true, livestock: true } });
  res.json(listings);
}