import { z } from 'zod';
import { buildJsonSchemas } from 'fastify-zod';

const warehouseCore = {
  name: z.string(),
  comment: z.string(),
};

const createWarehouseSchema = z.object({
  ...warehouseCore,
  storedUnitId: z.number(),
});

const warehouseResponseSchema = z.object({
  id: z.number(),
  ...warehouseCore,
  storedUnitId: z.number(),
  layout: z.string(),
  itemlist: z.string(),
  warehouseImageBinary: z.string(),
});

const updateWarehouseLayoutSchema = z.object({
  layout: z.string(),
});

const updateWarehouseItemlist = z.object({
  itemlist: z.string(),
});
const updateWarehouseImageSchema = z.object({
  imgBase64: z.string(),
});

const warehousesResponseSchema = z.array(warehouseResponseSchema);

export type CreateWarehouseInput = z.infer<typeof createWarehouseSchema>;

export type UpdateWarehouseLayout = z.infer<typeof updateWarehouseLayoutSchema>;

export type UpdateWarehouseItemlist = z.infer<typeof updateWarehouseItemlist>;
export type UpdateWarehouseImage = z.infer<typeof updateWarehouseImageSchema>;

const models = {
  createWarehouseSchema,
  updateWarehouseLayoutSchema,
  warehouseResponseSchema,
  warehousesResponseSchema,
  updateWarehouseItemlist,
  updateWarehouseImageSchema,
};

export const { schemas: warehouseSchemas, $ref } = buildJsonSchemas(models, {
  $id: 'warehouseSchema',
});
