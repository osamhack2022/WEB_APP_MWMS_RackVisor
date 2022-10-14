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

const createWarehouseResponseSchema = z.object({
  id: z.number(),
  ...warehouseCore,
});

export type CreateWarehouseInput = z.infer<typeof createWarehouseSchema>;

export const { schemas: warehouseSchemas, $ref } = buildJsonSchemas({
  createWarehouseSchema,
  createWarehouseResponseSchema,
});
