import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateActividadDto } from './dto/create-actividad.dto';
import { UpdateActividadDto } from './dto/update-actividad.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class ActividadService  extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
  async create(createActividadDto: CreateActividadDto) {
    return  await this.actividad.create({
      data:createActividadDto
    })
  }

  findAll() {
    return this.actividad.findMany();
  }

  async findOne(id: number) {
    const actividad =await this.actividad.findUnique({
      where:{id}
    })
    if(!actividad ){
      throw new NotFoundException('no hay notificacion con es id ')
    }

   return actividad
  }

  async update(id: number, updateActividadDto: UpdateActividadDto) {
    const  actividad =await this.actividad.findUnique({
      where:{id}
      
    });
    if(!actividad ){
      throw new NotFoundException ('el rendimientos de id ')
    }

    return this.notificacion.update({
      where :{id},
      data:updateActividadDto
    });
  }
  async remove(id: number) {
    const actividad =await this.actividad.findUnique({
      where:{id}
    });
    if(! actividad){
      throw new NotFoundException('actividad con id no es encuentra ')
    
    }
    await this .actividad.delete({
      where:{id}
    });


    return {nessage : `actividad con ID ${id} eliminado correctamente`}
  }
}
