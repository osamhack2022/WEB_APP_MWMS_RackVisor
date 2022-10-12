import { FastifyReply, FastifyRequest } from 'fastify';
import fp from 'fastify-plugin';

export default fp(async function (fastify, opts) {
  // ! [Auth] JWT
  fastify.register(import('@fastify/jwt'), {
    secret: 'supersecret',
  });

  fastify.decorate(
    'authenticateWithJWT',
    async function (request: FastifyRequest, reply: FastifyReply) {
      console.log('decorator worked');
      try {
        await request.jwtVerify();
      } catch (err) {
        reply.send(err);
      }
    }
  );
});
