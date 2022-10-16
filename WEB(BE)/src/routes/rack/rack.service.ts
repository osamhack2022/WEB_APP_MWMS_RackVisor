import { CreateRackInput, UpdateRackLayoutInput } from './rack.schema';
import prisma from '../../plugins/prisma';

export async function createRack(
  data: CreateRackInput,
  storedWarehouseId: number
) {
  const rack = await prisma.rack.create({
    data: {
      storedWarehouseId: storedWarehouseId,
      name: data.name,
    },
  });

  return rack;
}

export async function updateRackLayout(
  data: UpdateRackLayoutInput,
  rackId: number
) {
  const warehouse = await prisma.rack.update({
    where: {
      id: rackId,
    },
    data: {
      layout: data.layout,
    },
  });

  return warehouse.layout;
}

export async function findRacks(storedWarehouseId: number) {
  const racks = await prisma.rack.findMany({
    where: {
      storedWarehouseId: storedWarehouseId,
    },
    select: {
      name: true,
      id: true,
    },
  });

  return racks;
}
