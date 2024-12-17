

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
/*    async findAll() {
    
return await this.estudiantes.findMany()
    }  */

  async findAll(page: number=1 ,limit: number=10) {
    try{
      const skip =(page -1)*limit;
      
         const usuario= await this.usuarios.findMany(
          {
            where:{
          
            },
            skip:skip,
            take:limit,
          }
      
         );
         const total =await this.usuarios.count();
         return {
          data:usuario,
          meta:{
            total,
            page,
            limit,
            totalPages:Math.ceil(total/limit),
          },
         };
        
            }  catch(error: any){
            console.error('Error en finMany :',error);
            throw error;
          }
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
