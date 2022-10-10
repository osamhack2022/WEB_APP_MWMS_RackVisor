import { FastifyReply, FastifyRequest } from "fastify";
import fp from "fastify-plugin";

export default fp(async function (fastify, opts) {
  fastify.register(require("@fastify/jwt"), {
    secret: "supersecret",
  });

  fastify.decorate("authenticate", async function (request: FastifyRequest, reply: FastifyReply) {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  });
});
