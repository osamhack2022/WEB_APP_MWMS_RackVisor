import { FastifyInstance } from 'fastify';
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
      schema: {
        body: $ref('createUnitSchema'),
        response: {
          201: $ref('createUnitResponseSchema'),
        },
      },
    },
    registerUnitHandler
  );

  server.get(
    '/myUnits',
    {
      //preHandler: auth되어있는지 확인
    },
    findMyUnitsHandler
  );

  server.get(
    '/',
    {
      //preHandler: auth되어있는지 확인
    },
    getUnitsHandler
  );
}

export default unitRoutes;
