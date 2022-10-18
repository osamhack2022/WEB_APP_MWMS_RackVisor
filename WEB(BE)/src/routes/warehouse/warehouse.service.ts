import {
  CreateWarehouseInput,
  UpdateWarehouseLayout,
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
  warehouseId: number
) {
  const warehouse = await prisma.warehouse.update({
    where: {
      id: warehouseId,
    },
    data: {
      layout: data.layout,
    },
  });

  return warehouse.layout;
}

export async function readWarehousesOnUnit(storedUnitId: number) {
  const warehouses = await prisma.warehouse.findMany({
    where: {
      storedUnitId: storedUnitId,
    },
    select: {
      name: true,
      id: true,
      comment: true,
    },
  });
}
