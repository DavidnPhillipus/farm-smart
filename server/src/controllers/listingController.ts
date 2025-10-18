import { Request, Response } from "express";

export const getListings = async (req: Request, res: Response) => {
  const prisma = (req as any).prisma;
  const { searchTerm, category } = req.query;

  const where: any = {};
  if (searchTerm)
    where.name = { contains: searchTerm as string, mode: "insensitive" };
  if (category && category !== "All") where.category = category as string;

  const listings = await prisma.listing.findMany({ where });
  res.json(listings);
};
