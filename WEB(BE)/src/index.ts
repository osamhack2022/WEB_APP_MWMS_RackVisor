// ! [Import] Utils
import { PrismaClient } from '@prisma/client';
import fastify, { FastifyInstance } from 'fastify';
import jwt from './plugins/jwt';
import errorHandlers from './plugins/errorHandlers';

// ! [Import] Routes
import userRoutes from './routes/user/user.route';
import unitRoutes from './routes/unit/unit.route';
import warehouseRoutes from './routes/warehouse/warehouse.route';
import rackRoutes from './routes/rack/rack.route';
import boxRoutes from './routes/box/box.route';
import stockRoutes from './routes/stock/stock.route';
import postRoutes from './routes/post/post.route';
import historyRoutes from './routes/history/history.route';

// ! [Import] Schemas
import { userSchemas } from './routes/user/user.schema';
import { unitSchemas } from './routes/unit/unit.schema';
import { warehouseSchemas } from './routes/warehouse/warehouse.schema';
import { rackSchemas } from './routes/rack/rack.schema';
import { boxSchemas } from './routes/box/box.schema';
import { stockSchemas } from './routes/stock/stock.schema';
import { postSchemas } from './routes/post/post.schema';
import { historySchemas } from './routes/history/history.schema';
import { readFileSync } from 'fs';
import path, { join } from 'path';

const prisma = new PrismaClient();

// ! HTTPS
const app = fastify({
  https: {
    key: readFileSync(join(__dirname, 'cert', 'private.key')),
    cert: readFileSync(join(__dirname, 'cert', 'certificate.crt'))
  }
})

// ! HTTP
// const app = fastify({})

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
for (const schema of [
  ...userSchemas,
  ...unitSchemas,
  ...warehouseSchemas,
  ...rackSchemas,
  ...boxSchemas,
  ...stockSchemas,
  ...postSchemas,
  ...historySchemas,
]) {
  app.addSchema(schema);
}

// ! [Register] JWT, BCrypt, Cookie
app.register(jwt);
app.register(import('fastify-bcrypt'));
app.register(import('@fastify/cookie'), {
  secret: 'SECRET_HERE_COOKIE', // for cookies signature
});
app.register(import('@fastify/cors'), {
  origin: '*'
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
app.register(warehouseRoutes, { prefix: 'api/warehouses' });
app.register(rackRoutes, { prefix: 'api/racks' });
app.register(boxRoutes, { prefix: 'api/boxes' });
app.register(stockRoutes, { prefix: 'api/stocks' });
app.register(postRoutes, { prefix: 'api/posts' });
app.register(historyRoutes, { prefix: 'api/historys' });

// ! Error Handler
app.setErrorHandler(errorHandlers);

// ! [Server] Start Listening
app.listen({ port: 3001, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`[DEV] Server Started at ${address}`);
});
