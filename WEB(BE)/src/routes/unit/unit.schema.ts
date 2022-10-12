import { z } from 'zod';
import { buildJsonSchemas } from 'fastify-zod';

const unitCore = {
  name: z.string(),
  comment: z.string(),
};

const createUnitSchema = z.object({
  ...unitCore,
});

const createUnitResponseSchema = z.object({
  id: z.number(),
  ...unitCore,
});

export type CreateUnitInput = z.infer<typeof createUnitSchema>;

export const { schemas: unitSchemas, $ref } = buildJsonSchemas({
  createUnitSchema,
  createUnitResponseSchema,
});
