import fastify, { FastifyInstance } from 'fastify';
import { DecoratedFastifyInstance } from '../../index';
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
