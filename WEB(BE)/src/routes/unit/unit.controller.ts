import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateUnitInput } from './unit.schema';
import {
  addUserOnUnit,
  createUnit,
  findUnitByUser,
  findUnits,
} from './unit.service';

export async function registerUnitHandler(
  request: FastifyRequest<{
    Body: CreateUnitInput;
  }>,
  reply: FastifyReply
) {
  const body = request.body;

  try {
    const unit = await createUnit(body, request.user.id);

    return reply.code(201).send(unit);
  } catch (e) {
    console.error(e);
    return reply.code(500).send(e);
  }
}

export async function registerUserOnUnit(
  request: FastifyRequest<{
    Params: number;
  }>,
  reply: FastifyReply
) {
  const params = request.params;

  try {
    const unit = await addUserOnUnit(params, request.user.id);

    return reply.code(201).send(unit);
  } catch (e) {
    console.error(e);
    return reply.code(500).send(e);
  }
}

export async function findMyUnitsHandler(request: FastifyRequest) {
  const myUnits = await findUnitByUser(request.user.id);

  return myUnits;
}

export async function getUnitsHandler() {
  const units = await findUnits();

  return units;
}
