-- CreateTable
CREATE TABLE "novedades" (
    "id" SERIAL NOT NULL,
    "tipo_novedade" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "materiaId" INTEGER NOT NULL,
    "descricion" TEXT NOT NULL,

    CONSTRAINT "novedades_pkey" PRIMARY KEY ("id")
);
