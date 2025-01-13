-- CreateEnum
CREATE TYPE "Rol" AS ENUM ('ADMIN', 'PROFESOR', 'REPRESENTANTE', 'ESTUDIANTE');

-- CreateTable
CREATE TABLE "Usuarios" (
    "id" SERIAL NOT NULL,
    "cedula" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "rol" "Rol" NOT NULL,
    "sesionIniciada" BOOLEAN NOT NULL DEFAULT false,
    "profesorId" INTEGER,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "resetCode" TEXT,

    CONSTRAINT "Usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Representantes" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "cedula" TEXT NOT NULL,
    "nacionalidad" TEXT,
    "ciudad" TEXT,
    "correo" TEXT,
    "direccion_Domicilio" TEXT,
    "foto" TEXT,
    "numeroCelular1" TEXT NOT NULL,
    "numeroCelular2" TEXT,
    "numeroCelular3" TEXT,
    "genero" TEXT NOT NULL,
    "cantidadRepresentados" INTEGER NOT NULL DEFAULT 0,
    "personasNoAutorizadas" TEXT,
    "usuarioId" INTEGER,

    CONSTRAINT "Representantes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Estudiantes" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "cedula" TEXT NOT NULL,
    "genero" TEXT NOT NULL,
    "nacionalidad" TEXT,
    "fechaNacimiento" TIMESTAMP(3) NOT NULL,
    "curso" TEXT NOT NULL,
    "edad" INTEGER NOT NULL,
    "problemasDiscapacidad" BOOLEAN NOT NULL DEFAULT false,
    "problemasSalud" TEXT,
    "tipoSangre" TEXT,
    "representanteId" INTEGER,

    CONSTRAINT "Estudiantes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profesor" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "cedula" TEXT NOT NULL,

    CONSTRAINT "Profesor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Novedades" (
    "id" SERIAL NOT NULL,
    "tipo_novedade" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "profesorId" INTEGER NOT NULL,
    "descricion" TEXT NOT NULL,

    CONSTRAINT "Novedades_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Curso" (
    "id" SERIAL NOT NULL,
    "nombreCurso" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "duracion" INTEGER NOT NULL,
    "profesorId" INTEGER NOT NULL,

    CONSTRAINT "Curso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Materias" (
    "id" SERIAL NOT NULL,
    "nombreMateria" TEXT NOT NULL,
    "profesorId" INTEGER NOT NULL,

    CONSTRAINT "Materias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Actividad" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "materiaId" INTEGER NOT NULL,
    "cursoId" INTEGER NOT NULL,
    "profesorId" INTEGER,

    CONSTRAINT "Actividad_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rendimientos" (
    "id" SERIAL NOT NULL,
    "estudianteId" INTEGER NOT NULL,
    "tarea" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "observaciones" TEXT,

    CONSTRAINT "Rendimientos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notificacion" (
    "id" SERIAL NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "mensaje" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "tipo" TEXT NOT NULL,

    CONSTRAINT "Notificacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnioLectivo" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "fechaInicio" TIMESTAMP(3) NOT NULL,
    "fechaFin" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "AnioLectivo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EstudianteAnio" (
    "id" SERIAL NOT NULL,
    "estudianteId" INTEGER NOT NULL,
    "anioLectivoId" INTEGER NOT NULL,
    "curso" TEXT NOT NULL,
    "promedio" DOUBLE PRECISION,
    "estado" TEXT NOT NULL,

    CONSTRAINT "EstudianteAnio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HistorialAcademico" (
    "id" SERIAL NOT NULL,
    "estudianteId" INTEGER NOT NULL,
    "anioLectivoId" INTEGER NOT NULL,
    "curso" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "promedio" DOUBLE PRECISION,
    "fechaRegistro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "observaciones" TEXT,

    CONSTRAINT "HistorialAcademico_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuarios_cedula_key" ON "Usuarios"("cedula");

-- CreateIndex
CREATE UNIQUE INDEX "Usuarios_correo_key" ON "Usuarios"("correo");

-- CreateIndex
CREATE UNIQUE INDEX "Representantes_cedula_key" ON "Representantes"("cedula");

-- CreateIndex
CREATE UNIQUE INDEX "Estudiantes_cedula_key" ON "Estudiantes"("cedula");

-- CreateIndex
CREATE UNIQUE INDEX "Profesor_cedula_key" ON "Profesor"("cedula");

-- AddForeignKey
ALTER TABLE "Representantes" ADD CONSTRAINT "Representantes_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuarios"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Estudiantes" ADD CONSTRAINT "Estudiantes_representanteId_fkey" FOREIGN KEY ("representanteId") REFERENCES "Representantes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profesor" ADD CONSTRAINT "Profesor_id_fkey" FOREIGN KEY ("id") REFERENCES "Usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Novedades" ADD CONSTRAINT "Novedades_profesorId_fkey" FOREIGN KEY ("profesorId") REFERENCES "Profesor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Curso" ADD CONSTRAINT "Curso_profesorId_fkey" FOREIGN KEY ("profesorId") REFERENCES "Profesor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Materias" ADD CONSTRAINT "Materias_profesorId_fkey" FOREIGN KEY ("profesorId") REFERENCES "Profesor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Actividad" ADD CONSTRAINT "Actividad_materiaId_fkey" FOREIGN KEY ("materiaId") REFERENCES "Materias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Actividad" ADD CONSTRAINT "Actividad_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "Curso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Actividad" ADD CONSTRAINT "Actividad_profesorId_fkey" FOREIGN KEY ("profesorId") REFERENCES "Profesor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rendimientos" ADD CONSTRAINT "Rendimientos_estudianteId_fkey" FOREIGN KEY ("estudianteId") REFERENCES "Estudiantes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notificacion" ADD CONSTRAINT "Notificacion_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EstudianteAnio" ADD CONSTRAINT "EstudianteAnio_estudianteId_fkey" FOREIGN KEY ("estudianteId") REFERENCES "Estudiantes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EstudianteAnio" ADD CONSTRAINT "EstudianteAnio_anioLectivoId_fkey" FOREIGN KEY ("anioLectivoId") REFERENCES "AnioLectivo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistorialAcademico" ADD CONSTRAINT "HistorialAcademico_estudianteId_fkey" FOREIGN KEY ("estudianteId") REFERENCES "Estudiantes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistorialAcademico" ADD CONSTRAINT "HistorialAcademico_anioLectivoId_fkey" FOREIGN KEY ("anioLectivoId") REFERENCES "AnioLectivo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
