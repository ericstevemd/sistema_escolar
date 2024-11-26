import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateMateriaDto } from './dto/create-materia.dto';
import { UpdateMateriaDto } from './dto/update-materia.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class MateriasService extends PrismaClient implements OnModuleInit  {
 async onModuleInit() {
await this.$connect();
  }
  
  
  async create(createMateriaDto: CreateMateriaDto) {
    return  await this .materias.create({
      data:createMateriaDto
    });
  }

   findAll() {
    return this.materias.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} materia`;
  }

  update(id: number, updateMateriaDto: UpdateMateriaDto) {
    return `This action updates a #${id} materia`;
  }

  remove(id: number) {
    return `This action removes a #${id} materia`;
  }
}
