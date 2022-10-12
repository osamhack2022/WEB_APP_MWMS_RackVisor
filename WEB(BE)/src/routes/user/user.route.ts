import fastify, { FastifyInstance } from 'fastify';
import { DecoratedFastifyInstance } from '../../server';
import {
  loginHandler,
  registerUserHandler,
  getUsersHandler,
} from './user.controller';
import { $ref } from './user.schema';

async function userRoutes(server: FastifyInstance) {
  server.post(
    '/',
    {
      onRequest: [(server as DecoratedFastifyInstance).authenticateWithJWT],
      schema: {
        body: $ref('createUserSchema'),
        response: {
          201: $ref('createUserResponseSchema'),
        },
      },
    },
    registerUserHandler
  );

  server.post(
    '/login',
    {
      schema: {
        body: $ref('loginSchema'),
        response: {
          200: $ref('loginResponseSchema'),
        },
      },
    },
    loginHandler
  );

  server.get(
    '/',
    {
      onRequest: [(server as DecoratedFastifyInstance).authenticateWithJWT],
    },
    getUsersHandler
  );
}

export default userRoutes;
