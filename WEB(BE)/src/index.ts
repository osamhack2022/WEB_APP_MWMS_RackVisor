import { PrismaClient } from '@prisma/client';
import fastify, { FastifyInstance } from 'fastify';
import jwt from './plugins/jwt';

import userRoutes from './routes/user/user.route';
import unitRoutes from './routes/unit/unit.route';
import { userSchemas } from './routes/user/user.schema';
import { unitSchemas } from './routes/unit/unit.schema';

const prisma = new PrismaClient();
const app = fastify();

declare module '@fastify/jwt' {
  interface FastifyJWT {
    user: {
      id: number;
      email: string;
      name: string;
    };
  }
}

// ! [Export] Decorated Fastify Instace Type (auto type inject is not supported on decorator)
export type DecoratedFastifyInstance = FastifyInstance & {
  authenticateWithJWT: any;
};

// ! Add schmeas to Fastify
for (const schema of [...userSchemas, ...unitSchemas]) {
  app.addSchema(schema);
}

// ! [Register] JWT, BCrypt, Cookie
app.register(jwt);
app.register(import('fastify-bcrypt'));
app.register(import('@fastify/cookie'), {
  secret: 'SECRET_HERE_COOKIE', // for cookies signature
});

// ! [Register] Swagger
app.register(import('@fastify/swagger'), {
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
app.register(unitRoutes, { prefix: 'api/units' });

// ! [Server] Start Listening
app.listen({ port: 3003 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`[DEV] Server Started at ${address}`);
  console.log(`[DEV] 🚀 Server ready at: http://localhost:3003`);
});
