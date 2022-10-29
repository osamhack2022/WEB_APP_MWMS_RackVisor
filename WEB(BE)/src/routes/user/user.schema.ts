import { z } from 'zod';
import { buildJsonSchemas } from 'fastify-zod';

const userCore = {
  name: z.string(),
  militarySerialNumber: z.string({
    required_error: 'militarySerialNumber is required',
    invalid_type_error: 'militarySerialNumber must be a string',
  }),
  rank: z.string(),
  reigment: z.string(),
  position: z.string(),
};

const createUserSchema = z.object({
  ...userCore,
  password: z.string({
    required_error: 'Password is required',
    invalid_type_error: 'Password must be a string',
  }),
});

const createUserResponseSchema = z.object({
  id: z.number(),
  ...userCore,
});

const loginSchema = z.object({
  militarySerialNumber: z.string({
    required_error: 'militarySerialNumber is required',
    invalid_type_error: 'militarySerialNumber must be a string',
  }),
  password: z.string(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;

export type LoginInput = z.infer<typeof loginSchema>;

const models = {
  createUserSchema,
  createUserResponseSchema,
  loginSchema,
};

export const { schemas: userSchemas, $ref } = buildJsonSchemas(models, {
  $id: 'userSchema',
});
