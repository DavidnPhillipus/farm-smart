import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwtUtils";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const prisma = (req as any).prisma;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = generateToken({ id: user.id, role: user.role });
  res.json({ token, role: user.role, name: user.name });
};

export const register = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;
  const prisma = (req as any).prisma;

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) return res.status(400).json({ message: "User exists" });

  const hashedPassword = bcrypt.hashSync(password, 10);
  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword, role: role.toUpperCase() },
  });

  const token = generateToken({ id: user.id, role: user.role });
  res.json({ token, role: user.role, name: user.name });
};

export const getMe = async (req: Request, res: Response) => {
  const prisma = (req as any).prisma;
  const userId = (req as any).user.id;

  const user = await prisma.user.findUnique({ where: { id: userId } });
  res.json({ name: user?.name, role: user?.role });
};
