/*
  Warnings:

  - Added the required column `foto` to the `Actividad` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Actividad" ADD COLUMN     "foto" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Asistencia" (
    "id" SERIAL NOT NULL,
    "profesorId" INTEGER NOT NULL,
    "cursoId" INTEGER NOT NULL,
    "materiaId" INTEGER NOT NULL,
    "estudianteId" INTEGER NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "estado" TEXT NOT NULL,

    CONSTRAINT "Asistencia_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Asistencia" ADD CONSTRAINT "Asistencia_profesorId_fkey" FOREIGN KEY ("profesorId") REFERENCES "Profesor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Asistencia" ADD CONSTRAINT "Asistencia_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "Curso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Asistencia" ADD CONSTRAINT "Asistencia_materiaId_fkey" FOREIGN KEY ("materiaId") REFERENCES "Materias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Asistencia" ADD CONSTRAINT "Asistencia_estudianteId_fkey" FOREIGN KEY ("estudianteId") REFERENCES "Estudiantes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
