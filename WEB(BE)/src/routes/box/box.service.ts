import { CreateBoxInput } from './box.schema';
import prisma from '../../plugins/prisma';

export async function createBox(data: CreateBoxInput) {
  const box = await prisma.box.create({
    data: {
      name: data.name,
      storedRackId: data.storedRackId,
    },
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
