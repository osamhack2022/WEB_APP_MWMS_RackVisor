import { CreateUnitInput } from './unit.schema';
import prisma from '../../plugins/prisma';

//todo unit create or register 할때 M:N관계 설정 - 좀 어려울 것 같아 일단 보류

export async function createUnit(input: CreateUnitInput) {
  const unit = await prisma.unit.create({ data: input });

  return unit;
}

export async function findUnitByName(name: string) {
  return prisma.unit.findUnique({
    where: {
      name,
    },
  });
}

export async function findUnitByUser(userId: number) {
  return prisma.unit.findMany({});
}

export async function findUnits() {
  return prisma.unit.findMany({
    select: {
      name: true,
      id: true,
      comment: true,
    },
  });
}
