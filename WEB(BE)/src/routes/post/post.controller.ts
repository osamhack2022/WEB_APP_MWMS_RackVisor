import { FastifyReply, FastifyRequest } from 'fastify';
import { CreatePostInput, DeletePostInput } from './post.schema';
import {
  createPost,
  deletePostOnId,
  readPostOnId,
  readPostsOnUnit,
} from './post.service';

export async function registerPost(
  request: FastifyRequest<{
    Body: CreatePostInput;
  }>,
  reply: FastifyReply
) {
  const body = request.body;

  try {
    const post = await createPost(body);

    return reply.code(201).send(post);
  } catch (e) {
    console.error(e);
    return reply.code(500).send(e);
  }
}

export async function getPostOnId(
  request: FastifyRequest<{
    Params: { id: string };
  }>,
  reply: FastifyReply
) {
  const { id } = request.params;

  try {
    const post = await readPostOnId(+id);

    return reply.code(201).send(post);
  } catch (e) {
    console.error(e);
    return reply.code(500).send(e);
  }
}

export async function getPostsOnUnit(
  request: FastifyRequest<{
    Params: { unitId: string };
  }>,
  reply: FastifyReply
) {
  const { unitId } = request.params;

  try {
    const posts = await readPostsOnUnit(+unitId);

    return reply.code(201).send(posts);
  } catch (e) {
    console.error(e);
    return reply.code(500).send(e);
  }
}

export async function deletePost(
  request: FastifyRequest<{
    Body: DeletePostInput;
  }>,
  reply: FastifyReply
) {
  const { id } = request.body;

  try {
    const post = await deletePostOnId(id);

    return reply.code(201).send(post);
  } catch (e) {
    console.error(e);
    return reply.code(500).send(e);
  }
}
