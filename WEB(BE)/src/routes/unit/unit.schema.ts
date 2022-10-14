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
});

const unitResponseSchema = z.object({
  id: z.number(),
  ...unitCore,
});

const unitsResponseSchema = z.array(unitResponseSchema);

export type CreateUnitInput = z.infer<typeof createUnitSchema>;

export const { schemas: unitSchemas, $ref } = buildJsonSchemas({
  createUnitSchema,
  unitResponseSchema,
  unitsResponseSchema,
});
