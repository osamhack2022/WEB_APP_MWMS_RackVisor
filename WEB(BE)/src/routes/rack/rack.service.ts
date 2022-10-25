import {
  CreateRackInput,
  UpdateRackLayoutInput,
  UpdateRackNameInput,
} from './rack.schema';
import prisma from '../../plugins/prisma';

export async function createRack(data: CreateRackInput) {
  const rack = await prisma.rack.create({
    data: data,
  });

  return rack;
}

export async function updateRackLayout(
  data: UpdateRackLayoutInput,
  rackId: number
) {
  const rack = await prisma.rack.update({
    where: {
      id: rackId,
    },
    data: {
      layout: data.layout,
    },
  });

  return rack.layout;
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

export async function updateRackName(
  data: UpdateRackNameInput,
  rackId: number
) {
  const { name } = data;

  const rack = await prisma.rack.update({
    where: {
      id: rackId,
    },
    data: {
      name: name,
    },
  });

  return rack.name;
}

export async function readRackOnId(rackId: number) {
  const rack = await prisma.rack.findFirst({
    where: {
      id: rackId,
    },
    select: {
      id: true,
      name: true,
      layout: true,
      storedWarehouseId: true,
    },
  });

  return rack;
}
