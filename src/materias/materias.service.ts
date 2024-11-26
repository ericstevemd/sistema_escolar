import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
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

  async findOne(id: number) {
    const materias= await this.materias.findUnique({
      where:{id}
    });
    if(!materias){
      throw new NotFoundException("El id que estya buscando no se encuentra")
    }
    return materias 
  }

 async update(id: number, updateMateriaDto: UpdateMateriaDto) {
  const materias= await this.materias.findUnique({
    where:{id}
  }) ;
  if(! materias){
    throw new NotFoundException(" la materia fue actualizada ") 
  }
  return this.materias.update({
    where :{id},
    data:updateMateriaDto
  })
  }

   async remove(id: number) {
    const materias =await this.materias.findUnique({
      where :{ id }

    });
    return { message: `la materia  con Id ${id} elminida correctamente `} 
  }
}
