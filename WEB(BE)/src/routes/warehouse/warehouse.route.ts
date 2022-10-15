import { FastifyInstance } from 'fastify';
import { DecoratedFastifyInstance } from '../../index';
import {
  registerWarehouse,
  findWarehousesOnUnit,
} from './warehouse.controller';
import { $ref } from './warehouse.schema';

async function warehouseRoutes(server: FastifyInstance) {
  server.post(
    '/',
    {
      onRequest: [(server as DecoratedFastifyInstance).authenticateWithJWT],
      schema: {
        body: $ref('createWarehouseSchema'),
        response: {
          201: $ref('warehouseResponseSchema'),
        },
      },
    },
    registerWarehouse
  );

  server.get(
    '/:storedUnitId/',
    {
      onRequest: [(server as DecoratedFastifyInstance).authenticateWithJWT],
      schema: {
        response: {
          201: $ref('warehousesResponseSchema'),
        },
      },
    },
    findWarehousesOnUnit
  );
}

export default warehouseRoutes;
