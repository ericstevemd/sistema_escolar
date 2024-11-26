import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateProfesorDto } from './dto/create-profesor.dto';
import { UpdateProfesorDto } from './dto/update-profesor.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class ProfesorService  extends PrismaClient implements OnModuleInit{
  async onModuleInit() {
    await this.$connect();
  }
  async create(createProfesorDto: CreateProfesorDto) {
    return await this.profesor.create({
      data: createProfesorDto
    })
  }

  findAll() {
    return this.profesor.findMany();
  }

  async findOne(id: number) {
    const  profesor=await this. profesor.findUnique({
      where :{id}

    });
    if(! profesor ){
      throw new NotFoundException ("el profesor no hay id ")
    }
    return profesor
  }

  async update(id: number, updateProfesorDto: UpdateProfesorDto) {
    
    const profesor =await this.profesor.findUnique({
      where :{id}
    });
    if(! profesor){
      throw new NotFoundException("EL PROFESOR DE ID NO ENCUENTRA ")
    }

    return this.profesor.update({
      where:{id},
      data:updateProfesorDto
    });
  }

  async remove(id: number) {
    const profesor =await this.profesor.findUnique({
      where:{id}
    });
    if(!profesor){
      throw new NotFoundException("profesor con id no es encuentra ")
    }
   await this.profesor.delete({
    where:{id}
   }) ;
    return  {nessage : `PROFESOR con ID ${id} eliminado correctamente`};
  }
}
