import { CreateUnitInput } from './unit.schema';
import prisma from '../../plugins/prisma';

//todo unit create or register 할때 M:N관계 설정 - 좀 어려울 것 같아 일단 보류

export async function createUnit(input: CreateUnitInput) {
  const unit = await prisma.unit.create({
    data: {
      name: input.name,
      comment: input.comment,
      users: {
        create: [
          {
            user: {
              connect: {
                id: input.userId,
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
