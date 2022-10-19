import { z } from 'zod';
import { buildJsonSchemas } from 'fastify-zod';

const postCore = {
  title: z.string(),
  content: z.string(),
  authorId: z.number(),
  postingUnitId: z.number(),
};

const createPostSchema = z.object({
  ...postCore,
});

const postResponseSchema = z.object({
  id: z.number(),
  ...postCore,
  craeatedAt: z.date(),
});

const postsResponseSchema = z.array(postResponseSchema);

export type CreatePostInput = z.infer<typeof createPostSchema>;

const models = {
  createPostSchema,
  postResponseSchema,
  postsResponseSchema,
};

export const { schemas: postSchemas, $ref } = buildJsonSchemas(models, {
  $id: 'postSchema',
});
