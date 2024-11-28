
import * as jwt from 'jsonwebtoken';

import { Injectable, InternalServerErrorException, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { PrismaClient } from '@prisma/client';
import { EmailService } from 'src/email/email.service';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class UsuarioService extends PrismaClient implements OnModuleInit{
  
  constructor (private readonly configService:ConfigService){
    super();
   }
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

  async findOne(cedula:string) {
    
    const usuario=await this.usuarios.findFirst({
    where :{ 
      cedula
  },     
    });
    if(!usuario){
      throw new NotFoundException(`No se encontró un usuario con la cédula ${cedula}`)
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
    
    try{

    
    const usuario = await this.usuarios.findUnique({ where: { id } });
    if (!usuario) {
      throw new NotFoundException('El usuario con el ID proporcionado no existe');
    }
  
    return this.usuarios.update({
      where: { id },
      data: { isDeleted: true }, // Marcamos como eliminado
  
  
    
    }
  );
}catch(error){
  throw new InternalServerErrorException('Error al conectar con la base de datos');
}}  


async sendPasswordReset(email: string) {
  // Obtén el valor de JWT_SECRET
  const secret = this.configService.get<string>('JWT_SECRET');
  if (!secret) {
    throw new Error('JWT_SECRET no está configurado');
  }

  // Genera el token
  const token = jwt.sign({ email }, secret, { expiresIn: '1h' });

  console.log(`Token generado para ${email}: ${token}`);
  return token;

  // Aquí enviarías el token al correo electrónico
}
}