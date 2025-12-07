import prisma from '../config/prisma.js';
import bcrypt from 'bcryptjs';

export const findUserByEmail = async (email) => {
  return prisma.user.findUnique({
    where: {
      email: email,
    },
  });
};

export async function createUser(name, email, password) {
  //check if user already exists
  const existing = await findUserByEmail(email);
  if (existing) {
    const err = new Error('User already exists');
    err.status = 400;
    throw err;
  }

  // hash password
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  // remove password from response
  user.password = undefined;

  return user;
}
