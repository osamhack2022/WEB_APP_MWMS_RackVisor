import { FastifyReply, FastifyRequest } from 'fastify';
import {
  CreateWarehouseInput,
  UpdateWarehouseItemlist,
  UpdateWarehouseLayout,
} from './warehouse.schema';
import {
  createWarehouse,
  readWarehouseOnId,
  readWarehousesOnUnit,
  updateItemlist,
  updateWarehouseLayout,
} from './warehouse.service';

export async function registerWarehouse(
  request: FastifyRequest<{
    Body: CreateWarehouseInput;
  }>,
  reply: FastifyReply
) {
  const body = request.body;

  try {
    const warehouse = await createWarehouse(body);

    return reply.code(201).send(warehouse);
  } catch (e) {
    console.error(e);
    return reply.code(500).send(e);
  }
}

export async function updateLayoutOfWarehouse(
  request: FastifyRequest<{
    Body: UpdateWarehouseLayout;
    Params: { warehouseId: string };
  }>,
  reply: FastifyReply
) {
  const body = request.body;
  const { warehouseId } = request.params;

  try {
    const layout = await updateWarehouseLayout(body, +warehouseId);

    return reply.code(200).send(layout);
  } catch (e) {
    console.error(e);
    return reply.code(500).send(e);
  }
}

export async function findWarehousesOnUnit(
  request: FastifyRequest<{
    Params: { storedUnitId: string };
  }>,
  reply: FastifyReply
) {
  const { storedUnitId } = request.params;

  try {
    const warehouses = await readWarehousesOnUnit(+storedUnitId);

    return reply.code(200).send(warehouses);
  } catch (e) {
    console.error(e);
    return reply.code(500).send(e);
  }
}

export async function updateWarehouseItemlist(
  request: FastifyRequest<{
    Body: UpdateWarehouseItemlist;
    Params: { warehouseId: string };
  }>,
  reply: FastifyReply
) {
  const body = request.body;
  const { warehouseId } = request.params;

  try {
    const itemlist = await updateItemlist(body, +warehouseId);

    return reply.code(201).send(itemlist);
  } catch (e) {
    console.error(e);
    return reply.code(500).send(e);
  }
}

export async function getWarehouseOnId(
  request: FastifyRequest<{
    Params: { warehouseId: string };
  }>,
  reply: FastifyReply
) {
  const { warehouseId } = request.params;
  const warehouse = await readWarehouseOnId(+warehouseId);

  return reply.code(201).send(warehouse);
}
