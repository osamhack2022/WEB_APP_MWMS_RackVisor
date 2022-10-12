import { FastifyReply, FastifyRequest } from 'fastify';
import { verifyPassword } from '../../plugins/hash';
import { CreateUserInput, LoginInput } from './user.schema';
import { createUser, findUserByMSN, findUsers } from './user.service';

export async function registerUserHandler(
  request: FastifyRequest<{
    Body: CreateUserInput;
  }>,
  reply: FastifyReply
) {
  const body = request.body;

  try {
    const user = await createUser(body);

    return reply.code(201).send(user);
  } catch (e) {
    console.error(e);
    return reply.code(500).send(e);
  }
}

export async function loginHandler(
  request: FastifyRequest<{
    Body: LoginInput;
  }>,
  reply: FastifyReply
) {
  const body = request.body;

  const user = await findUserByMSN(body.militarySerialNumber);

  if (!user) {
    return reply.code(401).send({
      message: 'Invalid email or password',
    });
  }

  const correctPassword = verifyPassword({
    candidatePassword: body.password,
    salt: user.salt,
    hash: user.password,
  });

  if (correctPassword) {
    const { password, salt, ...rest } = user;
    const tempAccessToken = {};
    return { accessToken: tempAccessToken };
  }

  return reply.code(401).send({
    message: 'Invalid email or password',
  });
}

export async function getUsersHandler() {
  const users = await findUsers();

  return users;
}
