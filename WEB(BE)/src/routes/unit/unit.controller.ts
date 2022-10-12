import { FastifyReply, FastifyRequest, RequestBodyDefault } from 'fastify';
import { CreateUnitInput } from './unit.schema';
import {
  createUnit,
  findUnitByName,
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
    const unit = await createUnit({
      ...body,
      //todo: service M:N 관계 설정 구현하면 userId 추가
    });

    return reply.code(201).send(unit);
  } catch (e) {
    console.error(e);
    return reply.code(500).send(e);
  }
}

export async function findMyUnitsHandler(
  request: FastifyRequest,
) {
  const myUnits = await findUnitByUser(request.user.id);

  return myUnits;
}

export async function getUnitsHandler() {
  const units = await findUnits();

  return units;
}
