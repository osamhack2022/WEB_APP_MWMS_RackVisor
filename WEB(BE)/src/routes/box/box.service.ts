import { CreateBoxInput } from './box.schema';
import prisma from '../../plugins/prisma';

export async function createBox(
  data: CreateBoxInput & { storedRackId: number }
) {
  const box = await prisma.box.create({
    data: data,
  });

  return box;
}

export async function findBoxes(storedRackId: number) {
  const boxesOnRack = await prisma.rack.findUnique({
    where: {
      id: storedRackId,
    },
    select: {
      boxes: {
        select: {
          name: true,
          id: true,
        },
      },
    },
  });

  const boxes = boxesOnRack?.boxes;

  return boxes;
}
