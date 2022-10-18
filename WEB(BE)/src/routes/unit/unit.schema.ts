import { z } from 'zod';
import { buildJsonSchemas } from 'fastify-zod';

const unitCore = {
  name: z.string({
    required_error: 'Name is required',
    invalid_type_error: 'Name must be a string',
  }),
  comment: z.string(),
};

const createUnitSchema = z.object({
  ...unitCore,
  userId: z.number(),
});

const unitResponseSchema = z.object({
  id: z.number(),
  ...unitCore,
});

const unitsResponseSchema = z.array(unitResponseSchema);

export type CreateUnitInput = z.infer<typeof createUnitSchema>;

const models = {
  createUnitSchema,
  unitResponseSchema,
  unitsResponseSchema,
};

export const { schemas: unitSchemas, $ref } = buildJsonSchemas(models, {
  $id: 'unitSchema',
});
