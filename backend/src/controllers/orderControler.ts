import { Request, Response } from "express";

export const createOrder = async (req: Request, res: Response) => {
  const prisma = (req as any).prisma;
  const userId = (req as any).user.id;

  // Assume body has cartItems array for checkout
  const { cartItems } = req.body;

  const orders = await prisma.$transaction(
    cartItems.map((item: { listingId: number; quantity: number }) =>
      prisma.order.create({
        data: { userId, listingId: item.listingId, quantity: item.quantity },
      })
    )
  );

  // Clear cart
  await prisma.cartItem.deleteMany({ where: { userId } });

  res.json(orders);
};
