import { z, ZodString } from 'zod';
import { buildJsonSchemas } from 'fastify-zod';
// $ Declare Enum Type
const EnumTypeOfStockType = z.enum([
  'TYPE_NULL',
  'TYPE_1',
  'TYPE_2',
  'TYPE_3',
  'TYPE_4',
  'TYPE_5',
  'TYPE_6',
  'TYPE_7',
  'TYPE_8',
  'TYPE_9',
  'TYPE_10',
])

// ? Core
const stockCore = {
  name: z.string(),
  type: EnumTypeOfStockType,
  specipicType: z.string(),
  amount: z.number(),
  barcode: z.string(),
  comment: z.string(),
  expirationDate: z.date().or(z.any()),
  storedBoxId: z.number(),
};

// ? Request
const createStockSchema = z.object({
  ...stockCore,
});
const updateStockSchema = z.object({
  id: z.number(),
  ...stockCore,
});
const deleteStockSchema = z.object({
  id: z.number(),
});
const searchStockSchema = z.object({
  id: z.number().optional(),
  name: z.string().optional(),
  type: EnumTypeOfStockType.optional(),
  minAmount: z.number().optional(),
  maxAmount: z.number().optional(),
  barcode: z.string().optional(),
  minExpDate: z.string().optional(),
  maxExpDate: z.string().optional(),
  storedBoxId: z.number().optional(),
});


// ? Response
const stockResponseSchema = z.object({
  id: z.number(),
  ...stockCore,
});
const stocksResponseSchema = z.array(stockResponseSchema);

export type CreateStockInput = z.infer<typeof createStockSchema>;

export type updateStockInput = z.infer<typeof updateStockSchema>;

export type deleteStockInput = z.infer<typeof deleteStockSchema>;
export type AdvanedSearchStockInput = z.infer<typeof searchStockSchema>;

const models = {
  createStockSchema,
  stockResponseSchema,
  stocksResponseSchema,
  updateStockSchema,
  deleteStockSchema,
  searchStockSchema
};

export const { schemas: stockSchemas, $ref } = buildJsonSchemas(models, {
  $id: 'stockSchema',
});
