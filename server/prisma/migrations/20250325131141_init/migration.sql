-- CreateTable
CREATE TABLE "Url" (
    "alias" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "clickCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3),

    CONSTRAINT "Url_pkey" PRIMARY KEY ("alias")
);

-- CreateTable
CREATE TABLE "Analitic" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "ip" TEXT NOT NULL,
    "urlId" TEXT NOT NULL,

    CONSTRAINT "Analitic_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Url_url_alias_key" ON "Url"("url", "alias");

-- AddForeignKey
ALTER TABLE "Analitic" ADD CONSTRAINT "Analitic_urlId_fkey" FOREIGN KEY ("urlId") REFERENCES "Url"("alias") ON DELETE RESTRICT ON UPDATE CASCADE;
