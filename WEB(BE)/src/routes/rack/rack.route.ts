import { FastifyInstance } from 'fastify';
import { DecoratedFastifyInstance } from '../../index';
import { updateLayoutOfWarehouse } from '../warehouse/warehouse.controller';
import { registerRack, findRacksOnWarehouse, updateItemListOfRack } from './rack.controller';
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
<<<<<<< HEAD
    '/update-layout',
    {
      onRequest: [(server as DecoratedFastifyInstance).authenticateWithJWT],
      schema: {
        body: $ref('updateRackLayoutSchema'),
      },
    },
    updateLayoutOfLack
=======
    '/put-item-list/:rackId',
    {
      onRequest: [(server as DecoratedFastifyInstance).authenticateWithJWT],
      schema: {
        body: $ref('updateRackItemListSchema'),
        response: {
          200: $ref('updateRackItemListSchema'),
        },
      },
    },
    updateItemListOfRack
>>>>>>> 7eeaed990fd318bc182250e39c85d33cb468b2cb
  );
}

export default rackRoutes;
