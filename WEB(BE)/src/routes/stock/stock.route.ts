import { FastifyInstance } from 'fastify';
import { DecoratedFastifyInstance } from '../..';
import { registerStock } from './stock.controller';
import { $ref } from './stock.schema';

async function stockRoutes(server: FastifyInstance) {
  server.post(
    '/',
    {
      onRequest: [(server as DecoratedFastifyInstance).authenticateWithJWT],
      schema: {
        body: $ref('createStockSchema'),
        response: {
          201: $ref('stockResponseSchema'),
        },
      },
    },
    registerStock
  );

  // server.get(
  //   '/:storedStockId',
  //   {
  //     onRequest: [(server as DecoratedFastifyInstance).authenticateWithJWT],
  //     schema: {
  //       response: {
  //         201: $ref('stockResponseSchema'),
  //       },
  //     },
  //   },
  //   findRacksOnWarehouse
  // );
}

export default stockRoutes;
