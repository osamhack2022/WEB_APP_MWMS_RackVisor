import { FastifyInstance } from 'fastify';
import { DecoratedFastifyInstance } from '../..';
import {
  findStocksOnBox,
  findStocksOnWarehouse,
  registerStock,
} from './stock.controller';
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

  server.get(
    '/stocks-in-warehouse/:storedWarehouseId',
    {
      onRequest: [(server as DecoratedFastifyInstance).authenticateWithJWT],
      schema: {
        response: {
          201: $ref('stocksResponseSchema'),
        },
      },
    },
    findStocksOnWarehouse
  );

  server.get(
    '/stocks-in-box/:storedBoxId',
    {
      onRequest: [(server as DecoratedFastifyInstance).authenticateWithJWT],
      schema: {
        response: {
          201: $ref('stocksResponseSchema'),
        },
      },
    },
    findStocksOnBox
  );
}

export default stockRoutes;
