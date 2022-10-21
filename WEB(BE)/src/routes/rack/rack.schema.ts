import { z } from 'zod';
import { buildJsonSchemas } from 'fastify-zod';

const rackCore = {
  name: z.string(),
};

const createRackSchema = z.object({
  ...rackCore,
  storedWarehouseId: z.number(),
});

const rackResponseSchema = z.object({
  id: z.number(),
  ...rackCore,
  storedWarehouseId: z.number(),
});

const updateRackLayoutSchema = z.object({
  id: z.number(),
  layout: z.string(),
});

const updateRackItemListSchema = z.object({
  itemList: z.string(),
});

const racksResponseSchema = z.array(rackResponseSchema);

export type CreateRackInput = z.infer<typeof createRackSchema>;

export type UpdateRackLayoutInput = z.infer<typeof updateRackLayoutSchema>;
export type UpdateRackItemListInput = z.infer<typeof updateRackItemListSchema>;

const models = {
  createRackSchema,
  updateRackLayoutSchema,
  rackResponseSchema,
  racksResponseSchema, updateRackItemListSchema
};

export const { schemas: rackSchemas, $ref } = buildJsonSchemas(models, {
  $id: 'rackSchema',
});
