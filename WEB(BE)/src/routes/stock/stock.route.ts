import { FastifyInstance } from 'fastify';
import { DecoratedFastifyInstance } from '../..';
import {
  findStocksOnBox,
  findStocksOnWarehouse,
  registerStock,
  updateStocks,
  deleteStocks,
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

  server.put(
    '/stock-update',
    {
      onRequest: [(server as DecoratedFastifyInstance).authenticateWithJWT],
      schema: {
        body: $ref('updateStockSchema'),
        response: {
          201: $ref('stockResponseSchema'),
        },
      },
    },
    updateStocks
  );

  server.delete(
    '/stock',
    {
      onRequest: [(server as DecoratedFastifyInstance).authenticateWithJWT],
      schema: {
        body: $ref('deleteStockSchema'),
        response: {
          201: $ref('stockResponseSchema'),
        },
      },
    },
    deleteStocks
  );
}

export default stockRoutes;
