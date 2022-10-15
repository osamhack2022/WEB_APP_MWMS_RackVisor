import { z } from 'zod';
import { buildJsonSchemas } from 'fastify-zod';

const stockCore = {
  name: z.string(),
  type: z.enum([
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
  ]),
  specipicType: z.string(),
  amount: z.number(),
  barcode: z.string(),
  comment: z.string(),
  expirationDate: z.date().or(z.string()),
  storedBoxId: z.number(),
};

const createStockSchema = z.object({
  ...stockCore,
});

const stockResponseSchema = z.object({
  id: z.number(),
  ...stockCore,
});

const stocksResponseSchema = z.array(stockResponseSchema);

export type CreateStockInput = z.infer<typeof createStockSchema>;

const models = {
  createStockSchema,
  stockResponseSchema,
  stocksResponseSchema,
};

export const { schemas: stockSchemas, $ref } = buildJsonSchemas(models, {
  $id: 'stockSchema',
});
