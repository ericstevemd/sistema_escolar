/*
  Warnings:

  - Added the required column `profesorId` to the `Curso` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Curso" ADD COLUMN     "profesorId" INTEGER NOT NULL;
