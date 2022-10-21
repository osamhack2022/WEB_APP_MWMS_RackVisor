/*
  Warnings:

  - You are about to drop the column `itemList` on the `Rack` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Rack` DROP COLUMN `itemList`,
    MODIFY `layout` MEDIUMTEXT NULL;

-- AlterTable
ALTER TABLE `Warehouse` ADD COLUMN `warehouseImageBinary` LONGBLOB NULL,
    MODIFY `layout` MEDIUMTEXT NULL,
    MODIFY `itemlist` MEDIUMTEXT NULL;
