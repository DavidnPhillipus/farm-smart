import { Request, Response } from 'express';

export const getActivities = async (req: Request, res: Response) => {
  const prisma = (req as any).prisma;
  const userId = (req as any).user.id;

  const activities = await prisma.activity.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    take: 5,
  });
  res.json(activities.map(a => a.description));
};
