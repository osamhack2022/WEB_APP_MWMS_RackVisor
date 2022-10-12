-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `militarySerialNumber` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `salt` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `rank` ENUM('RANK_NULL', 'RANK_PV2', 'RANK_PFC', 'RANK_SPC', 'RANK_SGT', 'RANK_SSG', 'RANK_SFC', 'RANK_MSG', 'RANK_SGM', 'RANK_WO1', 'RANK_2LT', 'RANK_1LT', 'RANK_CPT', 'RANK_MAJ', 'RANK_LTC', 'RANK_COL', 'RANK_BG', 'RANK_MG', 'RANK_LTG', 'RANK_GEN') NOT NULL DEFAULT 'RANK_NULL',
    `reigment` VARCHAR(191) NOT NULL,
    `position` VARCHAR(191) NOT NULL,
    `phoneNumber` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_militarySerialNumber_key`(`militarySerialNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Unit` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `comment` VARCHAR(191) NULL,

    UNIQUE INDEX `Unit_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UsersOnUnits` (
    `userId` INTEGER NOT NULL,
    `unitId` INTEGER NOT NULL,

    PRIMARY KEY (`userId`, `unitId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Warehouse` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `comment` VARCHAR(191) NULL,
    `storedUnitId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Rack` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `locationX` INTEGER NOT NULL,
    `locationY` INTEGER NOT NULL,
    `width` INTEGER NOT NULL,
    `height` INTEGER NOT NULL,
    `storedWarehouseId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Box` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `locationX` INTEGER NOT NULL,
    `locationY` INTEGER NOT NULL,
    `width` INTEGER NOT NULL,
    `height` INTEGER NOT NULL,
    `storedRackId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Stock` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `type` ENUM('TYPE_NULL', 'TYPE_1', 'TYPE_2', 'TYPE_3', 'TYPE_4', 'TYPE_5', 'TYPE_6', 'TYPE_7', 'TYPE_8', 'TYPE_9', 'TYPE_10') NOT NULL,
    `specipicType` VARCHAR(191) NOT NULL,
    `amount` INTEGER NOT NULL DEFAULT 1,
    `barcode` VARCHAR(191) NULL,
    `comment` VARCHAR(191) NULL,
    `expirationDate` DATETIME(3) NULL,
    `storedBoxId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UsersOnUnits` ADD CONSTRAINT `UsersOnUnits_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UsersOnUnits` ADD CONSTRAINT `UsersOnUnits_unitId_fkey` FOREIGN KEY (`unitId`) REFERENCES `Unit`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Warehouse` ADD CONSTRAINT `Warehouse_storedUnitId_fkey` FOREIGN KEY (`storedUnitId`) REFERENCES `Unit`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Rack` ADD CONSTRAINT `Rack_storedWarehouseId_fkey` FOREIGN KEY (`storedWarehouseId`) REFERENCES `Warehouse`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Box` ADD CONSTRAINT `Box_storedRackId_fkey` FOREIGN KEY (`storedRackId`) REFERENCES `Rack`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Stock` ADD CONSTRAINT `Stock_storedBoxId_fkey` FOREIGN KEY (`storedBoxId`) REFERENCES `Box`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
