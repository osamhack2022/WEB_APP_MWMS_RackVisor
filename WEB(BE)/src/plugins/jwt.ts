import { FastifyReply, FastifyRequest } from 'fastify';
import fp from 'fastify-plugin';

export default fp(async function (fastify, opts) {
  // ! [Auth] JWT
  fastify.register(import('@fastify/jwt'), {
    secret: 'SECRET_HERE_JWT',
  });

  fastify.decorate(
    'authenticateWithJWT',
    async function (request: FastifyRequest, reply: FastifyReply) {
      try {
        // await
        console.log(request.cookies.jwt);
        const cookie1 = request.unsignCookie(request.cookies.jwt as any) as any;
        fastify.jwt.verify(cookie1);
      } catch (err) {
        reply.send(err);
      }
    }
  );
});
