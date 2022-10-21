import { FastifyInstance } from 'fastify';
import { DecoratedFastifyInstance } from '../../index';
import { updateLayoutOfWarehouse } from '../warehouse/warehouse.controller';
import {
  registerRack,
  findRacksOnWarehouse,
  updateItemListOfRack,
  updateLayoutOfRack,
  updateNameOfRack,
} from './rack.controller';
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
    '/racks-in-warehouse/:storedWarehouseId',
    {
      onRequest: [(server as DecoratedFastifyInstance).authenticateWithJWT],
      schema: {
        response: {
          200: $ref('racksResponseSchema'),
        },
      },
    },
    findRacksOnWarehouse
  );

  server.put(
    '/update-layout/:rackId',
    {
      onRequest: [(server as DecoratedFastifyInstance).authenticateWithJWT],
      schema: {
        body: $ref('updateRackLayoutSchema'),
      },
    },
    updateLayoutOfRack
  );

  server.put(
    '/update-name/:rackId',
    {
      onRequest: [(server as DecoratedFastifyInstance).authenticateWithJWT],
      schema: {
        body: $ref('updateRackNameSchema'),
      },
    },
    updateNameOfRack
  );
}

export default rackRoutes;
