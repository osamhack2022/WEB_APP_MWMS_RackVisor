import { CreateRackInput } from './rack.schema';
import prisma from '../../plugins/prisma';

export async function createRack(
  data: CreateRackInput & { storedWarehouseId: number }
) {
  const rack = await prisma.rack.create({
    data: data,
  });

  return rack;
}

export async function findRacks(storedWarehouseId: number) {
  const racks = await prisma.rack.findMany({
    where: {
      storedWarehouseId: storedWarehouseId,
    },
    select: {
      name: true,
      id: true,
      locationX: true,
      locationY: true,
      width: true,
      height: true,
    },
  });
}
