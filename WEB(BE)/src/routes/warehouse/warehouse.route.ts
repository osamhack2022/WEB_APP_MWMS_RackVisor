import { FastifyInstance } from 'fastify';
import { DecoratedFastifyInstance } from '../../index';
import {
  registerWarehouse,
  findWarehousesOnUnit,
  updateLayoutOfWarehouse,
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
    '/my-warehouses/:storedUnitId',
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

  server.put(
    '/update-layout',
    {
      onRequest: [(server as DecoratedFastifyInstance).authenticateWithJWT],
      schema: {
        body: $ref('updateWarehouseLayoutSchema'),
        response: {
          201: $ref('updateWarehouseLayoutSchema'),
        },
      },
    },
    updateLayoutOfWarehouse
  );
}

export default warehouseRoutes;
