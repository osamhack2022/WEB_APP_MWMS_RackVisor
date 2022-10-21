import { FastifyInstance } from 'fastify';
import { DecoratedFastifyInstance } from '../..';
import {
  registerPost,
  getPostOnId,
  getPostsOnUnit,
  deletePost,
} from './post.controller';
import { $ref } from './post.schema';

async function postRoutes(server: FastifyInstance) {
  server.post(
    '/',
    {
      onRequest: [(server as DecoratedFastifyInstance).authenticateWithJWT],
      schema: {
        body: $ref('createPostSchema'),
        response: {
          201: $ref('postResponseSchema'),
        },
      },
    },
    registerPost
  );

  server.get(
    '/unit-posts/:unitId',
    {
      onRequest: [(server as DecoratedFastifyInstance).authenticateWithJWT],
      schema: {
        response: {
          201: $ref('postsResponseSchema'),
        },
      },
    },
    getPostsOnUnit
  );

  server.get(
    '/:id',
    {
      onRequest: [(server as DecoratedFastifyInstance).authenticateWithJWT],
      schema: {
        response: {
          201: $ref('postResponseSchema'),
        },
      },
    },
    getPostOnId
  );

  server.delete(
    '/deletePost',
    {
      schema: {
        body: $ref('deletePostSchema'),
      },
    },
    deletePost
  );
}

export default postRoutes;
