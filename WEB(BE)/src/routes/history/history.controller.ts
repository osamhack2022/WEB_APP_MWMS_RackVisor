import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateHistoryInput } from './history.schema';
import { createHistory, readHistorysOnUnit } from './history.service';

export async function registerHistory(
  request: FastifyRequest<{
    Body: CreateHistoryInput;
  }>,
  reply: FastifyReply
) {
  const body = request.body;

  try {
    const history = await createHistory(body);

    return reply.code(201).send(history);
  } catch (e) {
    console.error(e);
    return reply.code(500).send(e);
  }
}

export async function getHistoryOnUnit(
  request: FastifyRequest<{
    Params: number;
  }>,
  reply: FastifyReply
) {
  const params = request.params;

  try {
    const historys = await readHistorysOnUnit(params);

    return reply.code(201).send(historys);
  } catch (e) {
    console.error(e);
    return reply.code(500).send(e);
  }
}
