import { Request, Response } from 'express';

export const getNotifications = async (req: Request, res: Response) => {
  const prisma = (req as any).prisma;
  const userId = (req as any).user.id;

  const notifications = await prisma.activity.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });

  res.json(notifications);
};

export const markNotificationRead = async (req: Request, res: Response) => {
  const prisma = (req as any).prisma;
  const id = parseInt(req.params.id);
  const userId = (req as any).user.id;

  const notification = await prisma.activity.findUnique({
    where: { id, userId },
  });
  if (!notification) return res.status(404).json({ message: 'Notification not found' });

  await prisma.activity.update({
    where: { id },
    data: { read: true },
  });

  res.json({ message: 'Marked as read' });
};