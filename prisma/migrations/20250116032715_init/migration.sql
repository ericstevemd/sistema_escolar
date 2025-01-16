-- DropForeignKey
ALTER TABLE "Actividad" DROP CONSTRAINT "Actividad_cursoId_fkey";

-- DropForeignKey
ALTER TABLE "Actividad" DROP CONSTRAINT "Actividad_materiaId_fkey";

-- AlterTable
ALTER TABLE "Actividad" ALTER COLUMN "materiaId" DROP NOT NULL,
ALTER COLUMN "cursoId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Actividad" ADD CONSTRAINT "Actividad_materiaId_fkey" FOREIGN KEY ("materiaId") REFERENCES "Materias"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Actividad" ADD CONSTRAINT "Actividad_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "Curso"("id") ON DELETE SET NULL ON UPDATE CASCADE;
