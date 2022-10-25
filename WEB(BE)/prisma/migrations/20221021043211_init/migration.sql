/*
  Warnings:

  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `User` table. All the data in the column will be lost.
  - You are about to alter the column `rank` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Enum("User_rank")` to `VarChar(191)`.

*/
-- DropIndex
DROP INDEX `User_email_key` ON `User`;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `email`,
    DROP COLUMN `phoneNumber`,
    MODIFY `rank` VARCHAR(191) NOT NULL;
