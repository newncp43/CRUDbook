import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../config';

export const protect = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const token = req.cookies.jwt; // ดึง token จาก cookie

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('JWT_SECRET must have a value');
    }

    const decoded = jwt.verify(token, secret) as { id: number };

    const user = await prisma.user.findUnique({ where: { id: decoded.id } });
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    (req as any).user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token expired or invalid' });
  }
};
