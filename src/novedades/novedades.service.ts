import { Injectable, OnModuleInit, NotFoundException } from '@nestjs/common';
import { CreateNovedadeDto } from './dto/create-novedade.dto';
import { UpdateNovedadeDto } from './dto/update-novedade.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class NovedadesService extends PrismaClient implements OnModuleInit {
  
 async onModuleInit() {
await this.$connect();
  }
 async create(createNovedadeDto: CreateNovedadeDto) {
  const { tipo_novedade, fecha, profesorId, descricion } = createNovedadeDto;
  const fechaISO = new Date(fecha).toISOString();

  return await this.novedades.create({
    data: {
      tipo_novedade,
      fecha: fechaISO,
      profesorId,
      descricion,
    },
  });
};
  findAll() {
   return this.novedades.findMany();

  }

  async findOne(id: number) {
    const novedades =await this.novedades.findUnique({
where :{id}
    });
    if(!novedades){
      throw new NotFoundException('la novedades no hay id ')
    }
    return novedades
  }

  async update(id: number, updateNovedadeDto: UpdateNovedadeDto) {

    const novedades =await this.novedades.findUnique({
      where :{id}
    });
    if(! novedades){
      throw new NotFoundException("EL PROFESOR DE ID NO ENCUENTRA ")
    }

    return this.novedades.update({
      where:{id},
      data:updateNovedadeDto
    });
  }
  

  async remove(id: number) {
    const novedades =await this.novedades.findUnique({
      where:{id}
    });
    if(!novedades){
      throw new NotFoundException("profesor con id no es encuentra ")
    }
   await this.novedades.delete({
    where:{id}
   }) ;
    return  {nessage : `PROFESOR con ID ${id} eliminado correctamente`};
  }


  async findnovedadesPorProfesor(profesorId: number) {
    return this.novedades.findMany({
      where: { profesorId },
    });
  }
  
}
