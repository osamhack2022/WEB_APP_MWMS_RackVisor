import { CreateUnitInput } from './unit.schema';
import prisma from '../../plugins/prisma';

export async function createUnit(input: CreateUnitInput, userId: number) {
  const unit = await prisma.unit.create({
    data: {
      name: input.name,
      comment: input.comment,
      users: {
        create: [
          {
            user: {
              connect: {
                id: userId,
              },
            },
          },
        ],
      },
    },
  });

  return unit;
}

export async function addUserOnUnit(unitId: number, userId: number) {
  const unit = await prisma.usersOnUnits.create({
    data: {
      userId: userId,
      unitId: unitId,
    },
  });

  return unit;
}

export async function findUnitByUser(userId: number) {
  const units = await prisma.usersOnUnits.findMany({
    where: {
      userId: userId,
    },
    select: {
      unit: true,
    },
  });

  return units;
}

export async function findUnits() {
  const units = prisma.unit.findMany({
    select: {
      name: true,
      id: true,
      comment: true,
    },
  });

  return units;
}
