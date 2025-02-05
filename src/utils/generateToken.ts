import jwt from 'jsonwebtoken';

// export const generateToken = (userId: number) => {
//   return jwt.sign({ id: userId }, process.env.JWT_SECRET as string, {
//     expiresIn: '1d',
//   });
// };
export const generateToken = (userId: number) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET must have a value');
  }

  return jwt.sign({ id: userId }, secret, {
    expiresIn: '2m',
  });
};
