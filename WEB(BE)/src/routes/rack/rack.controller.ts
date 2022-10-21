import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateRackInput, UpdateRackItemListInput, UpdateRackLayoutInput } from './rack.schema';
import { createRack, findRacks, updateRackItemList, updateRackLayout } from './rack.service';

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
    Params: { storedWarehouseId: string };
  }>,
  reply: FastifyReply
) {
  const { storedWarehouseId } = request.params;

  try {
    const racks = await findRacks(+storedWarehouseId);

    return reply.code(201).send(racks);
  } catch (e) {
    console.error(e);
    return reply.code(500).send(e);
  }
}

export async function updateLayoutOfRack(
  request: FastifyRequest<{
    Body: UpdateRackLayoutInput;
    Params: { rackId: string };
  }>,
  reply: FastifyReply
) {
  const body = request.body;
  const { rackId } = request.params;

  try {
    const layout = await updateRackLayout(body, +rackId);

    return reply.code(201).send(layout);
  } catch (e) {
    console.error(e);
    return reply.code(500).send(e);
  }
}

export async function updateItemListOfRack(
  request: FastifyRequest<{
    Body: UpdateRackItemListInput;
    Params: { rackId: string };
  }>,
  reply: FastifyReply
) {
  const body = request.body;
  const { rackId } = request.params;

  try {
    const layout = await updateRackItemList(body, +rackId);

    return reply.code(200).send(layout);
  } catch (e) {
    console.error(e);
    return reply.code(500).send(e);
  }
}

