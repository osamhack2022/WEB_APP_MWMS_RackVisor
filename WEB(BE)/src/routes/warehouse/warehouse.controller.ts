import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateWarehouseInput } from './warehouse.schema';
import { createWarehouse, findWarehouses } from './warehouse.service';

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

export async function findWarehousesOnUnit(request: FastifyRequest) {
  //   const storedUnitId = request.params.storedUnitId;
}
