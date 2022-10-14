import { FastifyInstance } from 'fastify';
import { DecoratedFastifyInstance } from '../..';
import {
  registerUnitHandler,
  findMyUnitsHandler,
  getUnitsHandler,
} from './unit.controller';
import { $ref } from './unit.schema';

async function unitRoutes(server: FastifyInstance) {
  server.post(
    '/',
    {
      onRequest: [(server as DecoratedFastifyInstance).authenticateWithJWT],
      schema: {
        body: $ref('createUnitSchema'),
        response: {
          201: $ref('unitResponseSchema'),
        },
      },
    },
    registerUnitHandler
  );

  server.get(
    '/myUnits',
    {
      schema: {
        response: {
          201: $ref('unitResponseSchema'),
        },
      },
      onRequest: [(server as DecoratedFastifyInstance).authenticateWithJWT],
    },
    findMyUnitsHandler
  );

  server.get(
    '/',
    {
      schema: {
        response: {
          201: $ref('unitsResponseSchema'),
        },
      },
      onRequest: [(server as DecoratedFastifyInstance).authenticateWithJWT],
    },
    getUnitsHandler
  );
}

export default unitRoutes;
