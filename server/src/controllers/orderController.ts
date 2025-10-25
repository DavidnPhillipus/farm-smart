import { Request, Response } from 'express';

export const createOrder = async (req: Request, res: Response) => {
  const prisma = (req as any).prisma;
  const userId = (req as any).user.id;
  const { cartItems } = req.body;

  try {
    // Create orders and update inventory in a transaction
    const orders = await prisma.$transaction(async (tx: any) => {
      const createdOrders = [];

      for (const item of cartItems) {
        // Get the listing to find the farmer
        const listing = await tx.listing.findUnique({
          where: { id: item.listingId },
          include: { crop: true, livestock: true },
        });

        if (!listing) {
          throw new Error(`Listing ${item.listingId} not found`);
        }

        // Create the order
        const order = await tx.order.create({
          data: {
            userId,
            listingId: item.listingId,
            quantity: item.quantity,
          },
        });

        // Update crop or livestock quantity
        if (listing.cropId) {
          await tx.crop.update({
            where: { id: listing.cropId },
            data: { quantity: { decrement: item.quantity } },
          });
        } else if (listing.livestockId) {
          await tx.livestock.update({
            where: { id: listing.livestockId },
            data: { quantity: { decrement: item.quantity } },
          });
        }

        // Create notification for the farmer
        const buyerInfo = await tx.user.findUnique({ where: { id: userId } });
        const itemName = listing.name;
        const notificationMessage = `New Order! ${buyerInfo?.name || 'A buyer'} ordered ${item.quantity} ${listing.name}. Check your inventory!`;

        await tx.activity.create({
          data: {
            userId: listing.userId,
            description: notificationMessage,
            read: false,
          },
        });

        createdOrders.push(order);
      }

      return createdOrders;
    });

    // Clear cart
    await prisma.cartItem.deleteMany({ where: { userId } });

    res.json({
      success: true,
      message: 'Order placed successfully!',
      orders,
    });
  } catch (err: any) {
    console.error('Order creation error:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to create order',
      error: err.message,
    });
  }
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