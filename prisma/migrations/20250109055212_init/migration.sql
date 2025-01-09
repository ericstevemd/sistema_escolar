/*
  Warnings:

  - You are about to drop the `Cursos` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Actividad" DROP CONSTRAINT "Actividad_cursoId_fkey";

-- DropTable
DROP TABLE "Cursos";

-- CreateTable
CREATE TABLE "Curso" (
    "id" SERIAL NOT NULL,
    "nombreCurso" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "duracion" INTEGER NOT NULL,

    CONSTRAINT "Curso_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Actividad" ADD CONSTRAINT "Actividad_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "Curso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
