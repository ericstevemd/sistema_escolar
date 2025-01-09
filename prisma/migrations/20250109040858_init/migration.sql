/*
  Warnings:

  - Added the required column `descripcion` to the `Cursos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `duracion` to the `Cursos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cursos" ADD COLUMN     "descripcion" TEXT NOT NULL,
ADD COLUMN     "duracion" INTEGER NOT NULL;
