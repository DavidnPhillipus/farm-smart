import { Request, Response } from 'express';

export const getCart = async (req: Request, res: Response) => {
  const prisma = (req as any).prisma;
  const userId = (req as any).user.id;

  const cartItems = await prisma.cartItem.findMany({
    where: { userId },
    include: { listing: true },
  });
  res.json(cartItems);
};

export const addToCart = async (req: Request, res: Response) => {
  const prisma = (req as any).prisma;
  const userId = (req as any).user.id;
  const { listingId, quantity } = req.body;

  const cartItem = await prisma.cartItem.upsert({
    where: { userId_listingId: { userId, listingId } },
    update: { quantity: { increment: quantity || 1 } },
    create: { userId, listingId, quantity: quantity || 1 },
  });
  res.json(cartItem);
};

export const updateQuantity = async (req: Request, res: Response) => {
  const prisma = (req as any).prisma;
  const id = parseInt(req.params.id);
  const { delta } = req.body;

  const cartItem = await prisma.cartItem.update({
    where: { id },
    data: { quantity: { increment: delta } },
  });
  if (cartItem.quantity < 1) await prisma.cartItem.delete({ where: { id } });
  res.json(cartItem);
};

export const removeFromCart = async (req: Request, res: Response) => {
  const prisma = (req as any).prisma;
  const id = parseInt(req.params.id);

  await prisma.cartItem.delete({ where: { id } });
  res.json({ message: 'Removed' });
};