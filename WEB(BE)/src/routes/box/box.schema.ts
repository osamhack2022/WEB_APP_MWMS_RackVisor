import { z } from 'zod';
import { buildJsonSchemas } from 'fastify-zod';

const boxCore = {
  name: z.string(),
};

const createBoxSchema = z.object({
  ...boxCore,
  storedRackId: z.number(),
});

const boxResponseSchema = z.object({
  id: z.number(),
  ...boxCore,
});

const boxesResponseSchema = z.array(boxResponseSchema);

export type CreateBoxInput = z.infer<typeof createBoxSchema>;

const models = {
  createBoxSchema,
  boxResponseSchema,
  boxesResponseSchema,
};

export const { schemas: boxSchemas, $ref } = buildJsonSchemas(models, {
  $id: 'boxSchema',
});
