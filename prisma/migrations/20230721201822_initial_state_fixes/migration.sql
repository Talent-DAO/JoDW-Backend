/*
  Warnings:

  - You are about to drop the column `networkid` on the `Chain` table. All the data in the column will be lost.
  - You are about to drop the column `chainid` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[chainId,address]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Chain" DROP CONSTRAINT "Chain_networkid_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_chainid_fkey";

-- DropIndex
DROP INDEX "User_chainid_address_key";

-- AlterTable
ALTER TABLE "Chain" DROP COLUMN "networkid",
ADD COLUMN     "networkId" INTEGER;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "chainid",
ADD COLUMN     "chainId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "User_chainId_address_key" ON "User"("chainId", "address");

-- AddForeignKey
ALTER TABLE "Chain" ADD CONSTRAINT "Chain_networkId_fkey" FOREIGN KEY ("networkId") REFERENCES "Network"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_chainId_fkey" FOREIGN KEY ("chainId") REFERENCES "Chain"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
