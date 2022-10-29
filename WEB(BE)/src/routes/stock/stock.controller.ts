import { FastifyReply } from 'fastify';
import { FastifyRequest } from 'fastify';
import {
  AdvanedSearchStockInput,
  CreateStockInput,
  deleteStockInput,
  updateStockInput,
} from './stock.schema';
import {
  advancedStockSearchService,
  createStock,
  deleteStock,
  readStocksOnBox,
  readStocksOnExpirationDate,
  readStocksOnWarehouse,
  updateStock,
} from './stock.service';

export async function registerStock(
  request: FastifyRequest<{
    Body: CreateStockInput;
  }>,
  reply: FastifyReply
) {
  // request.jwtDecode()
  const body = request.body;
  const stock = await createStock(body);
  return reply.code(201).send(stock);
}

export async function advancedStockSearchController(
  request: FastifyRequest<{
    Body: AdvanedSearchStockInput;
    Params: { unitId: string };
  }>,
  reply: FastifyReply
) {
  const { body } = request;
  const { unitId } = request.params;
  const targetStocks = await advancedStockSearchService(body, +unitId);
  return reply.code(200).send(targetStocks);
}

export async function findStocksOnWarehouse(
  request: FastifyRequest<{
    Params: { storedWarehouseId: string };
  }>,
  reply: FastifyReply
) {
  const { storedWarehouseId } = request.params;
  const stocks = await readStocksOnWarehouse(+storedWarehouseId);

  return reply.code(201).send(stocks);
}

export async function findStocksOnBox(
  request: FastifyRequest<{
    Params: { storedBoxId: string };
  }>,
  reply: FastifyReply
) {
  const { storedBoxId } = request.params;
  const stocks = await readStocksOnBox(+storedBoxId);

  return reply.code(200).send(stocks);
}

export async function updateStocks(
  request: FastifyRequest<{
    Body: updateStockInput;
  }>,
  reply: FastifyReply
) {
  const body = request.body;
  const stock = await updateStock(body);
  return reply.code(200).send(stock);
}

export async function deleteStocks(
  request: FastifyRequest<{
    Body: deleteStockInput;
  }>,
  reply: FastifyReply
) {
  const body = request.body;
  const stock = await deleteStock(body);

  return reply.code(200).send(stock);
}

export async function getStocksOnExpirationDate(
  request: FastifyRequest<{
    Params: { storedUnitId: string };
  }>,
  reply: FastifyReply
) {
  const { storedUnitId } = request.params;
  const stocks = await readStocksOnExpirationDate(+storedUnitId);

  return reply.code(201).send(stocks);
}
