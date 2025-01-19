/*
  Warnings:

  - Changed the type of `estado` on the `Asistencia` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "EstadoAsistencia" AS ENUM ('PRESENTE', 'AUSENTE', 'JUSTIFICADO');

-- AlterTable
ALTER TABLE "Asistencia" ADD COLUMN     "motivo" TEXT,
DROP COLUMN "estado",
ADD COLUMN     "estado" "EstadoAsistencia" NOT NULL;
