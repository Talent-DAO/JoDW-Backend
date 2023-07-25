/*
  Warnings:

  - Made the column `categoryId` on table `Subject` required. This step will fail if there are existing NULL values in that column.
  - Made the column `subjectId` on table `Topic` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Subject" ALTER COLUMN "categoryId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Topic" ALTER COLUMN "subjectId" SET NOT NULL;
