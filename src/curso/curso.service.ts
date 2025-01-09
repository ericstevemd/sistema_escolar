
import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class CursoService  extends PrismaClient implements OnModuleInit  {
  async onModuleInit() {
   await this.$connect();
  }
 async create(createCursoDto: CreateCursoDto) {
    return await this.curso.create({
      data :createCursoDto
    })
  }

  findAll() {
    return this.curso.findMany();
  }

  async findOne(id: number) {
   const curso=await this.curso.findUnique({
    where:{id}
   })
   if(! curso){
    throw new NotFoundException ('no hay Curso disponibles');
   }
   return curso
  }

  async update(id: number, updateCursoDto: UpdateCursoDto) {
  const curso =await this.curso.findUnique({
    where:{id}
  });
  if(!curso ){
    throw new NotFoundException ('el curso  de id no se encuentra  ')
  }
  return this.curso.update({
    where :{id},
    data:updateCursoDto 
  });
  }

  async remove(id: number) {
    const Curso =await this.curso.findUnique({
      where:{id}
    });
    if(! Curso){
      throw new NotFoundException('curso  con id no es encuentra ')
    
    }
    await this.curso.delete({
      where:{id}
    });


    return {nessage : `curso  con ID ${id} eliminado correctamente`}
  }
}
