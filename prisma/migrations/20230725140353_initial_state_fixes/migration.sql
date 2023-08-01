-- CreateTable
CREATE TABLE "Document" (
    "id" SERIAL NOT NULL,
    "uploader" INTEGER NOT NULL,
    "url" VARCHAR(2500) NOT NULL,
    "contentType" VARCHAR(18) NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUpdatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_uploader_fkey" FOREIGN KEY ("uploader") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
