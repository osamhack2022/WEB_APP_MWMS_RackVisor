import { FastifyRequest } from 'fastify';
import { FastifyReply } from 'fastify';
import { FastifyError } from 'fastify';

export default function (
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply
) {
  console.log('[New error start]')
  console.log(error.statusCode)
  console.log('[New error end]')
  switch (error.statusCode) {
    case 400:
      console.log('[ERROR] Schema Validation Failed');
      reply.status(400).send(error.message);
      break;

    default:
      console.log(error);
      console.log('[PANIC] Unexpected Error');
      reply.status(500).send('Internal Error');
      break;
  }
}
