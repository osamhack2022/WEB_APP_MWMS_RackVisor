import { CreateHistoryInput } from './history.schema';
import prisma from '../../plugins/prisma';

export async function createHistory(input: CreateHistoryInput) {
  const history = await prisma.history.create({
    data: {
      content: input.content,
      unitId: input.unitId,
    },
  });

  return history;
}

export async function readHistorysOnUnit(unitId: number) {
  const historys = await prisma.history.findMany({
    where: {
      unitId: unitId,
    },
    select: {
      content: true,
      unitId: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return historys;
}
