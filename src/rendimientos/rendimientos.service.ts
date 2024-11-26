import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateRendimientoDto } from './dto/create-rendimiento.dto';
import { UpdateRendimientoDto } from './dto/update-rendimiento.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class RendimientosService  extends PrismaClient implements OnModuleInit {
 async onModuleInit() {
  await this.$connect();
    
  }
  async create(createRendimientoDto: CreateRendimientoDto) {
   

   
    return await this.rendimientos.create({
      data :createRendimientoDto
    });
 
  
  }

  findAll() {
    return this.rendimientos.findMany();
  }

  async findOne(id: number) {
    const rendimiento = await this.rendimientos.findUnique({
where:{id}

    });
    if(!rendimiento ){
      throw new NotFoundException('no hay rendimiento con es id ')
    }

   return rendimiento
  }

  async update(id: number, updateRendimientoDto: UpdateRendimientoDto) {
    const  rendimiento =await this.rendimientos.findUnique({
      where:{id}
      
    });
    if(!rendimiento ){
      throw new NotFoundException ('el rendimientos de id ')
    }

    return this.rendimientos.update({
      where :{id},
      data:updateRendimientoDto
    });
  }

  async remove(id: number) {
    const rendimiento =await this.rendimientos.findUnique({
      where:{id}
    });
    if(! rendimiento){
      throw new NotFoundException('rendimiento con id no es encuentra ')
    
    }
    await this .rendimientos.delete({
      where:{id}
    });


    return {nessage : `rendimientos con ID ${id} eliminado correctamente`}
  }
}
