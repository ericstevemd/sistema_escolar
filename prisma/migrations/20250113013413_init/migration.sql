/*
  Warnings:

  - You are about to drop the `novedades` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "novedades";

-- CreateTable
CREATE TABLE "Novedades" (
    "id" SERIAL NOT NULL,
    "tipo_novedade" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "materiaId" INTEGER NOT NULL,
    "descricion" TEXT NOT NULL,

    CONSTRAINT "Novedades_pkey" PRIMARY KEY ("id")
);
