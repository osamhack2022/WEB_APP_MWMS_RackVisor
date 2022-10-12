import { FastifyInstance } from "fastify";

export const authRouter = (fastify: FastifyInstance) => {
  fastify.get("/", { onRequest: [fastify.authenticate] }, () => {});
};
