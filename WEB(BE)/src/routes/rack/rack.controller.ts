import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateRackInput, UpdateRackLayoutInput } from './rack.schema';
import { createRack, findRacks, updateRackLayout } from './rack.service';

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

export async function findRacksOnWarehouse(
  request: FastifyRequest<{
    Params: { storedWarehouseId: number };
  }>,
  reply: FastifyReply
) {
  const { storedWarehouseId } = request.params;

  try {
    const racks = await findRacks(storedWarehouseId);

    return reply.code(201).send(racks);
  } catch (e) {
    console.error(e);
    return reply.code(500).send(e);
  }
}

export async function updateLayoutOfLack(
  request: FastifyRequest<{
    Body: UpdateRackLayoutInput;
  }>,
  reply: FastifyReply
) {
  const body = request.body;

  try {
    const layout = await updateRackLayout(body);

    return reply.code(201).send(layout);
  } catch (e) {
    console.error(e);
    return reply.code(500).send(e);
  }
}
