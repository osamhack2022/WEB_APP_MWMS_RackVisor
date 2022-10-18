import { FastifyReply } from 'fastify';
import { FastifyRequest } from 'fastify';
import { CreateStockInput } from './stock.schema';
import {
  createStock,
  readStocksOnBox,
  readStocksOnWarehouse,
} from './stock.service';

export async function registerStock(
  request: FastifyRequest<{
    Body: CreateStockInput;
  }>,
  reply: FastifyReply
) {
  const body = request.body;

  try {
    const stock = await createStock(body);

    return reply.code(201).send(stock);
  } catch (e) {
    console.error(e);
    return reply.code(500).send(e);
  }
}

export async function findStocksOnWarehouse(
  request: FastifyRequest<{
    Params: number;
  }>,
  reply: FastifyReply
) {
  const params = request.params;

  try {
    const stocks = await readStocksOnWarehouse(params);

    return reply.code(201).send(stocks);
  } catch (e) {
    console.error(e);
    return reply.code(500).send(e);
  }
}

export async function findStocksOnBox(
  request: FastifyRequest<{
    Params: number;
  }>,
  reply: FastifyReply
) {
  const params = request.params;

  try {
    const stocks = await readStocksOnBox(params);

    return reply.code(201).send(stocks);
  } catch (e) {
    console.error(e);
    return reply.code(500).send(e);
  }
}
