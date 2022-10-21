import { CreateRackInput, UpdateRackLayoutInput } from './rack.schema';
import prisma from '../../plugins/prisma';

export async function createRack(data: CreateRackInput) {
  const rack = await prisma.rack.create({
    data: data,
  });

  return rack;
}

export async function updateRackLayout(data: UpdateRackLayoutInput) {
  const { id, layout } = data;

  const warehouse = await prisma.rack.update({
    where: {
      id: id,
    },
    data: {
      layout: layout,
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
