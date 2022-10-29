import { FastifyInstance } from 'fastify';
import { DecoratedFastifyInstance } from '../..';
import { registerHistory, getHistoryOnUnit } from './history.controller';
import { $ref } from './history.schema';

async function historyRoutes(server: FastifyInstance) {
  server.post(
    '/',
    {
      onRequest: [(server as DecoratedFastifyInstance).authenticateWithJWT],
      schema: {
        body: $ref('createHistorySchema'),
        response: {
          201: $ref('historyResponseSchema'),
        },
      },
    },
    registerHistory
  );

  server.get(
    '/:unitId',
    {
      onRequest: [(server as DecoratedFastifyInstance).authenticateWithJWT],
      schema: {
        response: {
          201: $ref('historysResponseSchema'),
        },
      },
    },
    getHistoryOnUnit
  );
}

export default historyRoutes;
