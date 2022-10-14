import { CreateWarehouseInput } from './warehouse.schema';
import prisma from '../../plugins/prisma';

export async function createWarehouse(
  data: CreateWarehouseInput & { storedUnitId: number }
) {
  const warehouse = await prisma.warehouse.create({
    data: data,
  });

  return warehouse;
}

export async function findWarehouses(storedUnitId: number) {
  const warehouses = prisma.warehouse.findMany({
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
