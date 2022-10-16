/*
  Warnings:

  - You are about to drop the column `height` on the `Box` table. All the data in the column will be lost.
  - You are about to drop the column `locationX` on the `Box` table. All the data in the column will be lost.
  - You are about to drop the column `locationY` on the `Box` table. All the data in the column will be lost.
  - You are about to drop the column `width` on the `Box` table. All the data in the column will be lost.
  - You are about to drop the column `height` on the `Rack` table. All the data in the column will be lost.
  - You are about to drop the column `locationX` on the `Rack` table. All the data in the column will be lost.
  - You are about to drop the column `locationY` on the `Rack` table. All the data in the column will be lost.
  - You are about to drop the column `width` on the `Rack` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Box` DROP COLUMN `height`,
    DROP COLUMN `locationX`,
    DROP COLUMN `locationY`,
    DROP COLUMN `width`;

-- AlterTable
ALTER TABLE `Rack` DROP COLUMN `height`,
    DROP COLUMN `locationX`,
    DROP COLUMN `locationY`,
    DROP COLUMN `width`,
    ADD COLUMN `layout` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Warehouse` ADD COLUMN `layout` VARCHAR(191) NULL;
