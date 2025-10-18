import express from 'express';
import { createCrop } from '../controllers/cropController';
import { authenticate, isFarmer } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/', authenticate, isFarmer, createCrop);

export default router;
```

**src/controllers/livestockController.ts**
```typescript
import { Request, Response } from 'express';

export const createLivestock = async (req: Request, res: Response) => {
  const prisma = (req as any).prisma;
  const userId = (req as any).user.id;
  const { animalType, breed, quantity, avgWeight, weightUnit, ageMonths, healthStatus, purchaseDate, purchasePrice, location, notes, imageUrls } = req.body;

  const livestock = await prisma.livestock.create({
    data: {
      userId,
      animalType,
      breed,
      quantity,
      avgWeight,
      weightUnit,
      ageMonths,
      healthStatus,
      purchaseDate: purchaseDate ? new Date(purchaseDate) : undefined,
      purchasePrice,
      location,
      notes,
      imageUrls,
    },
  });

  if (purchasePrice > 0) {
    await prisma.listing.create({
      data: {
        name: animalType,
        category: 'Livestock',
        price: `$${purchasePrice} / head`,
        image: imageUrls[0] || '',
        userId,
        livestockId: livestock.id,
      },
    });
  }

  await prisma.activity.create({
    data: {
      userId,
      description: `${quantity} ${animalType} added to inventory`,
    },
  });

  res.json(livestock);
};