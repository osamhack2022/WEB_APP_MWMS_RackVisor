import prisma from '../../plugins/prisma';
import {
  AdvanedSearchStockInput,
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

export const advancedStockSearchService = async (
  body: AdvanedSearchStockInput,
  unitId: number,
) => {
  const searchResult = await prisma.stock.findMany({
    where: {
      id: body.id,
      name: body.name,
      type: body.type,
      specipicType: body.specipicType,
      amount: {
        gte: body.minAmount,
        lte: body.maxAmount,
      },
      barcode: body.barcode,
      expirationDate: {
        gte: (body.minExpDate && new Date(body.minExpDate)) || undefined,
        lte: (body.maxExpDate && new Date(body.maxExpDate)) || undefined,
      },
      storedBoxId: body.storedBoxId,
      storedBox: {
        storedRack: {
          storedWarehouse: {
            storedUnitId: unitId
          }
        }
      },
      createdUser: {
        name: body.createdUserName
      }
    },
    include: {
      createdUser: {
        select: {
          name: true
        }
      }
    }
  });
  const invoices = searchResult.map((e) => ({
    ...e,
    createdUser: undefined,
    createdUserName: e.createdUser.name
  }))
  return invoices;
};

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

export async function readStocksOnExpirationDate(unitId: number) {
  const nowDate = new Date();
  nowDate.setDate(nowDate.getDate() + 7);

  const stocks = await prisma.stock.findMany({
    where: {
      storedBox: {
        storedRack: {
          storedWarehouse: {
            storedUnitId: unitId,
          },
        },
      },
      expirationDate: {
        lte: nowDate,
      },
    },
    orderBy: {
      expirationDate: 'asc',
    },
  });

  return stocks;
}
