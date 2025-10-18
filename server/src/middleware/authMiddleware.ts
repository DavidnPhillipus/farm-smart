import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    (req as any).user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

export const isFarmer = (req: Request, res: Response, next: NextFunction) => {
  if ((req as any).user.role !== 'FARMER') return res.status(403).json({ message: 'Access denied' });
  next();
};

export const isBuyer = (req: Request, res: Response, next: NextFunction) => {
  if ((req as any).user.role !== 'BUYER') return res.status(403).json({ message: 'Access denied' });
  next();
};