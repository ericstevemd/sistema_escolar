import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateNotificacioDto } from './dto/create-notificacio.dto';
import { UpdateNotificacioDto } from './dto/update-notificacio.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class NotificacioService  extends PrismaClient implements OnModuleInit  {
 async onModuleInit() {
  await this.$connect();

  }
  async create(createNotificacioDto: CreateNotificacioDto) {
    return await this.notificacion.create({
      data: createNotificacioDto
    });
    }

  findAll() {
    return this.notificacion.findMany();
  }

  async findOne(id: number) {
    const notificacio =await this.notificacion.findUnique({
      where:{id}
    })
    if(!notificacio ){
      throw new NotFoundException('no hay notificacion con es id ')
    }

   return notificacio
  }

  async update(id: number, updateNotificacioDto: UpdateNotificacioDto) {
    const  notificacio =await this.notificacion.findUnique({
      where:{id}
      
    });
    if(!notificacio ){
      throw new NotFoundException ('el rendimientos de id ')
    }

    return this.notificacion.update({
      where :{id},
      data:updateNotificacioDto
    });
  }

  async remove(id: number) {
    const notificacio =await this.notificacion.findUnique({
      where:{id}
    });
    if(! notificacio){
      throw new NotFoundException('notificacion con id no es encuentra ')
    
    }
    await this .notificacion.delete({
      where:{id}
    });


    return {nessage : `notificacion con ID ${id} eliminado correctamente`}
  }
}
