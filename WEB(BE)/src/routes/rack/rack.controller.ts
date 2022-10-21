import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateRackInput } from './rack.schema';
import { createRack, findRacks } from './rack.service';

export async function registerRack(
  request: FastifyRequest<{
    Body: CreateRackInput;
  }>,
  reply: FastifyReply
) {
  const body = request.body;

  try {
    const rack = await createRack(body);

    return reply.code(201).send(rack);
  } catch (e) {
    console.error(e);
    return reply.code(500).send(e);
  }
}

export async function findRacksOnWarehouse(request: FastifyRequest<{
  Params: { storedWarehouseId: number }
}>, reply: FastifyReply) {
  const { storedWarehouseId } = request.params;

  try {
    const racks = await findRacks(storedWarehouseId);

    return reply.code(200).send(racks);
  } catch (e) {
    console.error(e);
    return reply.code(500).send(e);
  }
}
