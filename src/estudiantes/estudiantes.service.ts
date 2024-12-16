

import { Injectable, NotFoundException, OnModuleInit, Query } from '@nestjs/common';
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

  async findOne(nombre :string ) {
  
     
    // Realiza la búsqueda con Prisma
    const estudiantes = await this.estudiantes.findMany({
      where: 
      { nombre}
  
    });
  
    if (!estudiantes || estudiantes.length === 0) {
      throw new Error('No se encontraron estudiantes con los criterios proporcionados.');
    }
  console.log(estudiantes);
    return estudiantes;
  }
  
  async update(id: number, updateEstudianteDto: UpdateEstudianteDto) {
    const estudiante = await this.estudiantes.findUnique({
      where: { id },
    });
    if (!estudiante) {
      throw new NotFoundException("El id que está buscando no se encuentra");
    }
    return await this.estudiantes.update({
      where: { id },
      data: updateEstudianteDto,
    });
  }
  
  
   
  async remove(id: number) {
const estudiante =await this.estudiantes.findUnique({
  where:{id},

});
if(!estudiante ){
  throw new NotFoundException(" el estudiantes no es puede eliminar ")
}
await this.estudiantes.delete({
  where:{id}

});
    return {nessage :'estudiantes con id no se encuentra '}
  }
}
