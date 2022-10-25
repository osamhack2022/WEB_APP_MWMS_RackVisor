/*
  Warnings:

  - Added the required column `itemlist` to the `Warehouse` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Rack` ADD COLUMN `itemList` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Warehouse` ADD COLUMN `itemlist` VARCHAR(191) NOT NULL;
