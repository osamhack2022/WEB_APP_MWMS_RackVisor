import { JWT } from '@fastify/jwt';
import { Prisma, PrismaClient, User } from '@prisma/client';
import fastify from 'fastify';
import userRoutes from './routes/user/user.route';
import { userSchemas } from './routes/user/user.schema';
import unitRoutes from './routes/unit/unit.route';

function buildServer() {
  const app = fastify();

  for (const schema of [...userSchemas]) {
    app.addSchema(schema);
  }

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
      // tags: [
      //   { name: 'user', description: 'User related end-points' },
      //   { name: 'code', description: 'Code related end-points' },
      // ],
      // definitions: {
      //   User: {
      //     type: 'object',
      //     required: ['id', 'email'],
      //     properties: {
      //       id: { type: 'string', format: 'uuid' },
      //       email: { type: 'string', format: 'email' },
      //     },
      //   },
      // },
      // securityDefinitions: {
      //   apiKey: {
      //     type: 'apiKey',
      //     name: 'apiKey',
      //     in: 'header',
      //   },
      // },
    },
    uiConfig: {
      docExpansion: 'full',
      deepLinking: true,
    },
    exposeRoute: true,
  });

  //routing
  app.register(userRoutes, { prefix: 'api/users' });
  app.register(unitRoutes, { prefix: 'api/units' });

  return app;
}

export default buildServer;
