import { z } from 'zod';
import { buildJsonSchemas } from 'fastify-zod';

const userCore = {
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a string',
    })
    .email(),
  name: z.string(),
  militarySerialNumber: z.string({
    required_error: 'militarySerialNumber is required',
    invalid_type_error: 'militarySerialNumber must be a string',
  }),
  rank: z.enum([
    'RANK_PV2',
    'RANK_PFC',
    'RANK_SPC',
    'RANK_SGT',
    'RANK_SSG',
    'RANK_SFC',
    'RANK_MSG',
    'RANK_SGM',
    'RANK_WO1',
    'RANK_2LT',
    'RANK_1LT',
    'RANK_CPT',
    'RANK_MAJ',
    'RANK_LTC',
    'RANK_COL',
    'RANK_BG',
    'RANK_MG',
    'RANK_LTG',
    'RANK_GEN',
  ]),
  reigment: z.string(),
  position: z.string(),
  phoneNumber: z.string(),
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

const loginResponseSchema = z.object({
  accessToken: z.string(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;

export type LoginInput = z.infer<typeof loginSchema>;

export const { schemas: userSchemas, $ref } = buildJsonSchemas({
  createUserSchema,
  createUserResponseSchema,
  loginSchema,
  loginResponseSchema,
});
