import { FastifyInstance } from 'fastify';
import { DecoratedFastifyInstance } from '../../index';
import { registerBox, findBoxesOnRack } from './box.controller';
import { $ref } from './box.schema';

async function boxRoutes(server: FastifyInstance) {
  server.post(
    '/',
    {
      onRequest: [(server as DecoratedFastifyInstance).authenticateWithJWT],
      schema: {
        body: $ref('createBoxSchema'),
        response: {
          201: $ref('boxResponseSchema'),
        },
      },
    },
    registerBox
  );

  server.get(
    'box-in-rack/:storedRackId',
    {
      onRequest: [(server as DecoratedFastifyInstance).authenticateWithJWT],
      schema: {
        response: {
          201: $ref('boxesResponseSchema'),
        },
      },
    },
    findBoxesOnRack
  );
}

export default boxRoutes;
