-- DropForeignKey
ALTER TABLE "Analitic" DROP CONSTRAINT "Analitic_urlId_fkey";

-- AddForeignKey
ALTER TABLE "Analitic" ADD CONSTRAINT "Analitic_urlId_fkey" FOREIGN KEY ("urlId") REFERENCES "Url"("alias") ON DELETE CASCADE ON UPDATE CASCADE;
