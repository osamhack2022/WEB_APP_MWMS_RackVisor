import { z } from 'zod';
import { buildJsonSchemas } from 'fastify-zod';

const warehouseCore = {
  name: z.string(),
  comment: z.string(),
};

const createWarehouseSchema = z.object({
  ...warehouseCore,
});

const warehouseResponseSchema = z.object({
  id: z.number(),
  ...warehouseCore,
  storedUnitId: z.number(),
});

const updateWarehouseLayoutSchema = z.object({
  layout: z.string(),
});

const warehousesResponseSchema = z.array(warehouseResponseSchema);

export type CreateWarehouseInput = z.infer<typeof createWarehouseSchema>;

export type UpdateWarehouseLayout = z.infer<typeof updateWarehouseLayoutSchema>;

const models = {
  createWarehouseSchema,
  updateWarehouseLayoutSchema,
  warehouseResponseSchema,
  warehousesResponseSchema,
};

export const { schemas: warehouseSchemas, $ref } = buildJsonSchemas(models, {
  $id: 'warehouseSchema',
});
