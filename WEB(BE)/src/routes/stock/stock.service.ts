import prisma from '../../plugins/prisma';
import { CreateStockInput } from './stock.schema';

export async function createStock(input: CreateStockInput) {
  const stock = await prisma.stock.create({
    data: { ...input, expirationDate: new Date(input.expirationDate) },
  });

  return stock;
}

export async function readStocksOnWarehouse(storedWarehouseId: number) {
  const stocks = await prisma.stock.findMany({
    where: {
      storedBox: {
        storedRack: {
          storedWarehouseId: storedWarehouseId,
        },
      },
    },
  });

  return stocks;
}

export async function readStocksOnBox(storedBoxId: number) {
  const stocks = await prisma.stock.findMany({
    where: {
      storedBoxId: storedBoxId,
    },
  });

  return stocks;
}
