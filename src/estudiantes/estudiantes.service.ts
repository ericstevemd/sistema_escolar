

import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class EstudiantesService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
     await this.$connect;
  }
  async create(createEstudianteDto: CreateEstudianteDto) {
   
   
    return await this.estudiantes.create({
      data:createEstudianteDto
    })
  }

  findAll() {
    return this.estudiantes.findMany();
  }

  async findOne(id: number) {
    
    const Estudiante =await this.estudiantes.findUnique({
      where:{id},
    })
    return Estudiante
  }

  update(id: number, updateEstudianteDto: UpdateEstudianteDto) {
    return `This action updates a #${id} estudiante`;
  }

  remove(id: number) {
    return `This action removes a #${id} estudiante`;
  }
}
