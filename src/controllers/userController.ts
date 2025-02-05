import { Request, Response } from 'express';
import { prisma } from '../config';

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, username: true, createdAt: true }, // เลือกเฉพาะฟิลด์ที่ต้องการแสดง
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users' });
  }
};
