import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateAsistenciaDto } from './dto/create-asistencia.dto';
import { UpdateAsistenciaDto } from './dto/update-asistencia.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class AsistenciaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect;
  }


  async create(createAsistenciaDto: CreateAsistenciaDto) {
    return await this.asistencia.create({
      data: {
        profesorId: createAsistenciaDto.profesorId,
        cursoId: createAsistenciaDto.cursoId,
        materiaId: createAsistenciaDto.materiaId,
        estudianteId: createAsistenciaDto.estudianteId,
        fecha: createAsistenciaDto.fecha || new Date(),
        estado: createAsistenciaDto.estado,
        motivo: createAsistenciaDto.motivo,
      },
      include: {
        estudiante: true,
        materia: true,
        profesor: true,
      },
    });
  }

  async findAll() {
    return await this.asistencia.findMany({
      include: {
        estudiante: true,
        materia: true,
        profesor: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.asistencia.findUnique({
      where: { id },
      include: {
        estudiante: true,
        materia: true,
        profesor: true,
      },
    });
  }

  async update(id: number, updateAsistenciaDto: UpdateAsistenciaDto) {
    return await this.asistencia.update({
      where: { id },
      data: {
        estado: updateAsistenciaDto.estado,
        motivo: updateAsistenciaDto.motivo,
      }, include: {
        estudiante: true,
        materia: true,
        profesor: true,
      },
    });
  }

  async remove(id: number) {
    return await this.asistencia.delete({
      where: { id },
      include: {
        estudiante: true,
        materia: true,
        profesor: true,
      },
    });
  }
}
