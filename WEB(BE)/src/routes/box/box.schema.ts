import { z } from 'zod';
import { buildJsonSchemas } from 'fastify-zod';

const boxCore = {
  name: z.string(),
  locationX: z.number(),
  locationY: z.number(),
  width: z.number(),
  height: z.number(),
  storedRackId: z.number(),
};

const createBoxSchema = z.object({
  ...boxCore,
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
