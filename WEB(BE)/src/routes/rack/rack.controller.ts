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

export async function findRacksOnWarehouse(request: FastifyRequest) {
  //todo 구현
}
