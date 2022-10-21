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
  createdAt: z.date(),
});

const postsResponseSchema = z.array(postResponseSchema);

const deletePostSchema = z.object({
  id: z.number(),
});

export type CreatePostInput = z.infer<typeof createPostSchema>;

export type DeletePostInput = z.infer<typeof deletePostSchema>;

const models = {
  createPostSchema,
  postResponseSchema,
  postsResponseSchema,
  deletePostSchema,
};

export const { schemas: postSchemas, $ref } = buildJsonSchemas(models, {
  $id: 'postSchema',
});
