-- DropForeignKey
ALTER TABLE "Usuarios" DROP CONSTRAINT "Usuarios_profesorId_fkey";

-- AddForeignKey
ALTER TABLE "Profesor" ADD CONSTRAINT "Profesor_id_fkey" FOREIGN KEY ("id") REFERENCES "Usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
