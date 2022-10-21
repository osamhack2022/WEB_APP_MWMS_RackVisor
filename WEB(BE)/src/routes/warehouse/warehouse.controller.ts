import { FastifyReply, FastifyRequest } from 'fastify';
import {
  CreateWarehouseInput,
  UpdateWarehouseLayout,
} from './warehouse.schema';
import {
  createWarehouse,
  readWarehousesOnUnit,
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
    Params: number;
  }>,
  reply: FastifyReply
) {
  const body = request.body;

  const params = request.params;

  try {
    const layout = await updateWarehouseLayout(body, params);

    return reply.code(200).send(layout);
  } catch (e) {
    console.error(e);
    return reply.code(500).send(e);
  }
}

export async function findWarehousesOnUnit(
  request: FastifyRequest<{
    Params: number;
  }>,
  reply: FastifyReply
) {
  const params = request.params;

  try {
    const warehouses = await readWarehousesOnUnit(params);

    return reply.code(200).send(warehouses);
  } catch (e) {
    console.error(e);
    return reply.code(500).send(e);
  }
}
