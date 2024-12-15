
import { BadRequestException, ConflictException, Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateRepresentanteDto } from './dto/create-representante.dto';
import { UpdateRepresentanteDto } from './dto/update-representante.dto';
import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class RepresentantesService extends PrismaClient implements OnModuleInit {

  async onModuleInit() {
await this.$connect(); 
  }
  async create(createRepresentanteDto: CreateRepresentanteDto) {
    try {
      return await this.representantes.create({
        data: createRepresentanteDto,
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new ConflictException('Ya existe un representante con esta cédula');
      } else if (error instanceof PrismaClientKnownRequestError && error.code === 'P2000') {
        throw new BadRequestException('Error de validación: uno o más campos son inválidos.');
      }
      throw error;
    }
  }

  findAll() {
    return this.representantes.findMany()
  }

  async findOne(id: number) {
    const representantes=await this .representantes.findUnique({
      where :{id},
    })
    if(!representantes){
      throw new NotFoundException('no hay usuario con es id ')
    }
    return  representantes
  }

  

  async update(id: number, updateRepresentanteDto: UpdateRepresentanteDto) {
    const representantes =await this.representantes.findUnique({ where :{
      id
    }});
    if(!representantes){
      throw new NotFoundException ('el usuario con el id  no encuentra ')
    }
    return this.representantes.update({
      where:{id},
      data:updateRepresentanteDto
    });
  }

  async remove(id: number) {
    const Representante=await this.representantes.findUnique({
      where:{id},
    });
    if(!Representante){
      throw new NotFoundException('Representantes con id no es encuentra ')
    }
    await this.representantes.delete({
      where:{id},    
    });
    return {nessage : `Representante con ID ${id} eliminado correctamente`}
  }
}
