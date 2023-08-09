-- CreateTable
CREATE TABLE "ArticleNft" (
    "articleId" INTEGER NOT NULL,
    "signedTx" BYTEA NOT NULL,
    "address" TEXT,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUpdatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ArticleNft_pkey" PRIMARY KEY ("articleId")
);

-- CreateTable
CREATE TABLE "Queue" (
    "id" SERIAL NOT NULL,
    "enqueuedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "channel" VARCHAR(64) NOT NULL,
    "payload" BYTEA NOT NULL,

    CONSTRAINT "Queue_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ArticleNft" ADD CONSTRAINT "ArticleNft_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
