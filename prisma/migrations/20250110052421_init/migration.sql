/*
  Warnings:

  - Added the required column `profesorId` to the `Materias` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Materias" ADD COLUMN     "profesorId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Materias" ADD CONSTRAINT "Materias_profesorId_fkey" FOREIGN KEY ("profesorId") REFERENCES "Profesor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
