
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

  async findAll(isActive: boolean = true, page: number=1 ,limit: number=10) {
   
    try{
const skip =(page -1)*limit;

   const usuario= await this.usuarios.findMany(
    {
      where:{
        isDeleted:!isActive
      },
      skip:skip,
      take:limit,
    }

   );
   const total =await this.usuarios.count({
    where:{
      isDeleted: !isActive,
    }
        
   });
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

  async findOne(id:number,cedula?:string ,correo?:string) {
    
    const usuario=await this.usuarios.findFirst({
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

   async remove(id: number) {
    const usuario = await this.usuarios.findUnique({ where: { id } });
    if (!usuario) {
      throw new NotFoundException('El usuario con el ID proporcionado no existe');
    }
  
    return this.usuarios.update({
      where: { id },
      data: { isDeleted: true }, // Marcamos como eliminado
    });
  }
}