import { z } from 'zod';
import { buildJsonSchemas } from 'fastify-zod';

const warehouseCore = {
  name: z.string(),
  comment: z.string(),
  storedUnitId: z.number(),
};

const createWarehouseSchema = z.object({
  ...warehouseCore,
});

const warehouseResponseSchema = z.object({
  id: z.number(),
  ...warehouseCore,
});

const warehousesResponseSchema = z.array(warehouseResponseSchema);

export type CreateWarehouseInput = z.infer<typeof createWarehouseSchema>;

const models = {
  createWarehouseSchema,
  warehouseResponseSchema,
  warehousesResponseSchema,
};

export const { schemas: warehouseSchemas, $ref } = buildJsonSchemas(models, {
  $id: 'warehouseSchema',
});
