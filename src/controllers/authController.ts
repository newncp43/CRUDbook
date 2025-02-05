import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { prisma } from '../config';
import { findUserByEmail, createUser } from '../models/userModel';
import { generateToken } from '../utils/generateToken';

interface User {
    id: number;
    username: string;
    password: string;
}

export const signup = async (req: Request, res: Response) : Promise<User | any> => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Please provide all fields' });
  }

  const existingUser = await findUserByEmail(username);
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await createUser(username, hashedPassword);
  const token = generateToken(user.id);

  res.status(201).json({ token });
};

export const login = async (req: Request, res: Response): Promise<User | any> => {
  const { username, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { username } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }


    const token = generateToken(user.id);

    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 1000, 
    });

    res.json({ user, message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error });
  }
};
