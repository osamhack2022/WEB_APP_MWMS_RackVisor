import prisma from '../../plugins/prisma';
import {
  CreateStockInput,
  deleteStockInput,
  updateStockInput,
} from './stock.schema';

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

export async function updateStock(data: updateStockInput) {
  const stock = await prisma.stock.update({
    where: {
      id: data.id,
    },
    data: {
      name: data.name,
      type: data.type,
      specipicType: data.specipicType,
      amount: data.amount,
      barcode: data.barcode,
      comment: data.comment,
      expirationDate: data.expirationDate,
      storedBoxId: data.storedBoxId,
    },
  });

  return stock;
}

export async function deleteStock(stockId: deleteStockInput) {
  const stock = await prisma.stock.delete({
    where: {
      id: stockId.id,
    },
  });

  return stock;
}
