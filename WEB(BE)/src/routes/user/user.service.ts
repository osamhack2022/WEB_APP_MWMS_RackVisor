import { CreateUserInput } from './user.schema';
import { hashPassword } from '../../plugins/hash';
import prisma from './../../plugins/prisma';

export async function createUser(input: CreateUserInput) {
  const { password, ...rest } = input;

  const { hash, salt } = hashPassword(password);

  const user = await prisma.user.create({
    data: { ...rest, salt, password: hash },
  });

  return user;
}

export async function findUserByMSN(militarySerialNumber: string) {
  return prisma.user.findUnique({
    where: {
      militarySerialNumber,
    },
  });
}

export async function findUsers() {
  return prisma.user.findMany({
    select: {
      email: true,
      name: true,
      id: true,
    },
  });
}
