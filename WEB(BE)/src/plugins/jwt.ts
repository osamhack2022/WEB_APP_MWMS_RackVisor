import { FastifyReply, FastifyRequest } from 'fastify';
import fp from 'fastify-plugin';

export default fp(async function (fastify, opts) {
  // ! [Auth] JWT
  fastify.register(import('@fastify/jwt'), {
    secret: 'SECRET_HERE_JWT',
    cookie: {
      cookieName: 'token',
      signed: false,
    },
  });

  fastify.decorate(
    'authenticateWithJWT',
    async function (request: FastifyRequest, reply: FastifyReply) {
      try {
        console.log('JWT Verify start');
        await request.jwtVerify();
        console.log('JWT Verify end');
      } catch (err: any) {
        switch (err.statusCode) {
          case 401:
            reply.send('NO_TOKEN');
        }
      }
    }
  );
});
