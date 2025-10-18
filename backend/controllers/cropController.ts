import { Request, Response } from 'express';

export const createCrop = async (req: Request, res: Response) => {
  const prisma = (req as any).prisma;
  const userId = (req as any).user.id;
  const { cropName, variety, quantity, unit, harvestDate, pricePerUnit, category, location, description, imageUrls } = req.body;

  const crop = await prisma.crop.create({
    data: {
      userId,
      cropName,
      variety,
      quantity,
      unit,
      harvestDate: new Date(harvestDate),
      pricePerUnit,
      category,
      location,
      description,
      imageUrls,
    },
  });

  if (pricePerUnit > 0) {
    await prisma.listing.create({
      data: {
        name: cropName,
        category,
        price: `$${pricePerUnit} / ${unit}`,
        image: imageUrls[0] || '',
        userId,
        cropId: crop.id,
      },
    });
  }

  await prisma.activity.create({
    data: {
      userId,
      description: `${quantity}${unit} ${cropName} added to inventory`,
    },
  });

  res.json(crop);
};