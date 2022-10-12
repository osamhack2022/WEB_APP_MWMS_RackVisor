import { PrismaClient } from '@prisma/client';
import fastify, { FastifyInstance } from 'fastify';
import jwt from './plugins/jwt';

import userRoutes from './routes/user/user.route';
import { userSchemas } from './routes/user/user.schema';

const prisma = new PrismaClient();
const app = fastify();

// ! [Export] Decorated Fastify Instace Type (auto type inject is not supported on decorator)
export type DecoratedFastifyInstance = FastifyInstance & {
  authenticateWithJWT: any;
};

for (const schema of [...userSchemas]) {
  app.addSchema(schema);
}

// ! [Register] JWT, BCrypt
app.register(import('fastify-bcrypt'));
app.register(jwt);

// ! [Register] Swagger
app.register(require('@fastify/swagger'), {
  routePrefix: '/docs',
  swagger: {
    info: {
      title: 'MWMS',
      description: "MWMS' rest api swagger",
      version: '1.0.0',
    },
    externalDocs: {
      url: 'https://swagger.io',
      description: 'Find more info here',
    },
    host: 'localhost',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
  },
  uiConfig: {
    docExpansion: 'full',
    deepLinking: true,
  },
  exposeRoute: true,
});

// ! [Register] Routing
app.register(userRoutes, { prefix: 'api/users' });

// ! [Server] Start Listening
app.listen({ port: 3003 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`[DEV] Server Started at ${address}`);
  console.log(`[DEV] 🚀 Server ready at: http://localhost:3003`);
});
