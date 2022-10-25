import { z } from 'zod';
import { buildJsonSchemas } from 'fastify-zod';

const historyCore = {
  content: z.string(),
  unitId: z.number(),
};

const createHistorySchema = z.object({
  ...historyCore,
});

const historyResponseSchema = z.object({
  ...historyCore,
  createdAt: z.date(),
});

const historysResponseSchema = z.array(historyResponseSchema);

export type CreateHistoryInput = z.infer<typeof createHistorySchema>;

const models = {
  createHistorySchema,
  historyResponseSchema,
  historysResponseSchema,
};

export const { schemas: historySchemas, $ref } = buildJsonSchemas(models, {
  $id: 'historySchema',
});
