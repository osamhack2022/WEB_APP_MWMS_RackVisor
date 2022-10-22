import {
  CreateWarehouseInput,
  UpdateWarehouseLayout,
  UpdateWarehouseItemlist,
  UpdateWarehouseImage,
} from './warehouse.schema';
import prisma from '../../plugins/prisma';

export async function createWarehouse(data: CreateWarehouseInput) {
  const warehouse = await prisma.warehouse.create({
    data: {
      storedUnitId: data.storedUnitId,
      name: data.name,
      comment: data.comment,
    },
  });

  return warehouse;
}

export async function updateWarehouseLayout(
  data: UpdateWarehouseLayout,
  id: number
) {
  const { layout } = data;

  const warehouse = await prisma.warehouse.update({
    where: {
      id,
    },
    data: {
      layout: layout,
    },
  });

  return warehouse.layout;
}

export async function readWarehousesOnUnit(storedUnitId: number) {
  const warehouses = await prisma.warehouse.findMany({
    where: {
      storedUnitId,
    },
    select: {
      name: true,
      id: true,
      comment: true,
      storedUnitId: true,
      layout: true,
      itemlist: true,
      warehouseImageBinary: true,
    },
  });
  return warehouses;
}

export async function updateItemlist(
  data: UpdateWarehouseItemlist,
  id: number
) {
  const { itemlist } = data;

  const warehouse = await prisma.warehouse.update({
    where: {
      id,
    },
    data: {
      itemlist: itemlist,
    },
  });

  return warehouse.itemlist;
}

export const updateWarehouseImageService = async (
  data: UpdateWarehouseImage,
  id: number
) => {
  await prisma.warehouse.update({
    where: { id },
    data: {
      warehouseImageBinary: Buffer.from(data.imgBase64, 'base64'),
    },
  });
};

export async function readWarehouseOnId(id: number) {
  const warehouse = await prisma.warehouse.findFirst({
    where: {
      id: id,
    },
    select: {
      id: true,
      name: true,
      comment: true,
      storedUnitId: true,
      layout: true,
      itemlist: true,
      warehouseImageBinary: true,
    },
  });

  return {
    ...warehouse,
    imgBase64: warehouse?.warehouseImageBinary?.toString('base64'),
    warehouseImageBinary: undefined,
  };
}
