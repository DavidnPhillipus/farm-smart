import { Request, Response } from 'express';

export const getInventory = async (req: Request, res: Response) => {
  const prisma = (req as any).prisma;
  const userId = (req as any).user.id;

  const crops = await prisma.crop.findMany({ where: { userId }, include: { listing: true } });
  const livestock = await prisma.livestock.findMany({ where: { userId }, include: { listing: true } });

  const inventory = [
    ...crops.map((c: any) => ({
      id: c.id,
      name: c.cropName,
      category: c.category,
      quantity: c.quantity,
      pricePerUnit: c.pricePerUnit,
      listed: !!c.listing,
      image: c.imageUrls[0] || '',
      type: 'crop',
    })),
    ...livestock.map((l: any) => ({
      id: l.id,
      name: l.animalType,
      category: 'Livestock',
      quantity: l.quantity,
      pricePerUnit: l.purchasePrice || 0,
      listed: !!l.listing,
      image: l.imageUrls[0] || '',
      type: 'livestock',
    })),
  ];

  res.json(inventory);
};

export const toggleListing = async (req: Request, res: Response) => {
  const prisma = (req as any).prisma;
  const userId = (req as any).user.id;
  const { itemId, type, listed } = req.body;

  let item;
  if (type === 'crop') {
    item = await prisma.crop.findUnique({ where: { id: itemId, userId }, include: { listing: true } });
  } else if (type === 'livestock') {
    item = await prisma.livestock.findUnique({ where: { id: itemId, userId }, include: { listing: true } });
  }
  if (!item) return res.status(404).json({ message: 'Item not found' });

  if (listed && !item.listing) {
    const name = type === 'crop' ? (item as any).cropName : (item as any).animalType;
    const category = type === 'crop' ? (item as any).category : 'Livestock';
    const pricePerUnit = type === 'crop' ? (item as any).pricePerUnit : (item as any).purchasePrice;
    const unit = type === 'crop' ? (item as any).unit : 'head';
    await prisma.listing.create({
      data: {
        name,
        category,
        price: `$${pricePerUnit} / ${unit}`,
        image: (item as any).imageUrls[0] || '',
        userId,
        ...(type === 'crop' ? { cropId: itemId } : { livestockId: itemId }),
      },
    });
  } else if (!listed && item.listing) {
    await prisma.listing.delete({ where: { id: item.listing.id } });
  }

  res.json({ message: 'Toggled' });
};
