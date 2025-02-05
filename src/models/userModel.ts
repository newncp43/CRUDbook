import { prisma } from '../config';

export const findUserByEmail = async (username: string) => {
  return prisma.user.findUnique({ where: { username } });
};

export const createUser = async (username: string, password: string) => {
  return prisma.user.create({
    data: { username, password },
  });
};
