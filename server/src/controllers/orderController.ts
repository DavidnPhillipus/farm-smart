import { Request, Response } from 'express';

export const createOrder = async (req: Request, res: Response) => {
  const prisma = (req as any).prisma;
  const userId = (req as any).user.id;
  const { cartItems } = req.body;

  const orders = await prisma.$transaction(
    cartItems.map((item: { listingId: number; quantity: number }) =>
      prisma.order.create({
        data: { userId, listingId: item.listingId, quantity: item.quantity },
      })
    )
  );

  await prisma.cartItem.deleteMany({ where: { userId } });

  res.json(orders);
};

export const getOrders = async (req: Request, res: Response) => {
  const prisma = (req as any).prisma;
  const userId = (req as any).user.id;

  const orders = await prisma.order.findMany({
    where: { userId },
    include: { listing: true },
    orderBy: { createdAt: 'desc' },
  });

  res.json(orders);
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  const prisma = (req as any).prisma;
  const id = parseInt(req.params.id || '0');

  const order = await prisma.order.update({
    where: { id },
    data: { status: 'delivered' },
  });

  res.json(order);
};