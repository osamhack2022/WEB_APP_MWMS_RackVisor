import { z } from 'zod';
import { buildJsonSchemas } from 'fastify-zod';

const rackCore = {
  name: z.string(),
  locationX: z.number(),
  locationY: z.number(),
  width: z.number(),
  height: z.number(),
  storedWarehouseId: z.number(),
};

const createRackSchema = z.object({
  ...rackCore,
});

const rackResponseSchema = z.object({
  id: z.number(),
  ...rackCore,
});

const racksResponseSchema = z.array(rackResponseSchema);

export type CreateRackInput = z.infer<typeof createRackSchema>;

const models = {
  createRackSchema,
  rackResponseSchema,
  racksResponseSchema,
};

export const { schemas: rackSchemas, $ref } = buildJsonSchemas(models, {
  $id: 'rackSchema',
});
