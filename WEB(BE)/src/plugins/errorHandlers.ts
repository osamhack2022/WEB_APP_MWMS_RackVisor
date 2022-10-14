import { FastifyRequest } from 'fastify';
import { FastifyReply } from 'fastify';
import { FastifyError } from 'fastify';

export default function (
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply
) {
  console.log(error);
  reply.status(500).send('Internal Error');
}
