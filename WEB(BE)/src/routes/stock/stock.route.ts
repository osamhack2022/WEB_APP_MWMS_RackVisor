import { FastifyInstance } from 'fastify';
import { DecoratedFastifyInstance } from '../..';
import {
  findStocksOnBox,
  findStocksOnWarehouse,
  registerStock,
  updateStocks,
  deleteStocks,
  advancedStockSearchController,
  getStocksOnExpirationDate,
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

  // ? Advanced Search
  server.post(
    '/advanced-search',
    {
      onRequest: [(server as DecoratedFastifyInstance).authenticateWithJWT],
      schema: {
        body: $ref('searchStockSchema'),
        response: {
          200: $ref('stocksResponseSchema'),
        },
      },
    },
    advancedStockSearchController
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

  server.get(
    '/by-expiration-date/:storedUnitId',
    {
      onRequest: [(server as DecoratedFastifyInstance).authenticateWithJWT],
      schema: {
        response: {
          201: $ref('stocksResponseSchema'),
        },
      },
    },
    getStocksOnExpirationDate
  );
}

export default stockRoutes;
