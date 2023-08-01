/*
  Warnings:

  - You are about to drop the column `content` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Article` table. All the data in the column will be lost.
  - Added the required column `contentId` to the `Article` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageId` to the `Article` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Article" DROP COLUMN "content",
DROP COLUMN "image",
ADD COLUMN     "contentId" INTEGER NOT NULL,
ADD COLUMN     "imageId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Document"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Document"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
