import prisma from '../../plugins/prisma';
import { CreateStockInput } from './stock.schema';

export async function createStock(input: CreateStockInput) {
  const stock = await prisma.stock.create({ data: input });

  return stock;
}
