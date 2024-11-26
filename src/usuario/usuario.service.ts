
import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class UsuarioService extends PrismaClient implements OnModuleInit{
  async onModuleInit() {
   await this.$connect();
  }

  create(createUsuarioDto: CreateUsuarioDto) {
    return this.usuarios.create({
      data:createUsuarioDto,
    });
  }

  async findAll() {
    try{

      return this.usuarios.findMany()
    }catch(error){
      console.error('Error en finMany :',error);
      throw error;
    }

  }

  async findOne(id: number) {
    const usuario=await this .usuarios.findUnique({
      where :{id},


    })
    if(!usuario){
      throw new NotFoundException('no hay usuario con es id ')
    }
    return  usuario
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    const usuario =await this.usuarios.findUnique({ where :{
      id
    }});
    if(!usuario){
      throw new NotFoundException ('el usuario con el id  no encuentra ')
    }
    return this.usuarios.update({
      where:{id},
      data:updateUsuarioDto
    })
  }

  // remove(id: number) {
  //   return `This action removes a #${id} usuario`;
  // }
}