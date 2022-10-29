import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateBoxInput } from './box.schema';
import { createBox, findBoxes } from './box.service';

export async function registerBox(
  request: FastifyRequest<{
    Body: CreateBoxInput;
  }>,
  reply: FastifyReply
) {
  const body = request.body;

  try {
    const box = await createBox(body);

    return reply.code(201).send(box);
  } catch (e) {
    console.error(e);
    return reply.code(500).send(e);
  }
}

export async function findBoxesOnRack(request: FastifyRequest<{
  Params: { rackId: string };
}>, reply: FastifyReply) {
  const { rackId } = request.params;
  const boxes = await findBoxes(+rackId);
  return reply.code(200).send(boxes);
}
