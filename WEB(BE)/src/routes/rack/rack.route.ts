import { FastifyInstance } from 'fastify';
import { DecoratedFastifyInstance } from '../../index';
import { registerRack, findRacksOnWarehouse } from './rack.controller';
import { $ref } from './rack.schema';

async function rackRoutes(server: FastifyInstance) {
  server.post(
    '/',
    {
      onRequest: [(server as DecoratedFastifyInstance).authenticateWithJWT],
      schema: {
        body: $ref('createRackSchema'),
        response: {
          201: $ref('rackResponseSchema'),
        },
      },
    },
    registerRack
  );

  server.get(
    '/:storedWarehouseId',
    {
      onRequest: [(server as DecoratedFastifyInstance).authenticateWithJWT],
      schema: {
        response: {
          201: $ref('racksResponseSchema'),
        },
      },
    },
    findRacksOnWarehouse
  );
}
