
import * as jwt from 'jsonwebtoken';

import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class UsuarioService extends PrismaClient implements OnModuleInit{
  emailService: any;
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
    const usuario = await this.usuarios.findUnique({ where: { id } });
    if (!usuario) {
      throw new NotFoundException('El usuario con el ID proporcionado no existe');
    }
  
    return this.usuarios.update({
      where: { id },
      data: { isDeleted: true }, // Marcamos como eliminado
    });
  }

  async generateResetCode(email: string): Promise<string> {
    const usuario = await this.usuarios.findUnique({ where: { correo: email } });

    if (!usuario) {
      throw new NotFoundException('No se encontró un usuario con ese correo');
    }

    // Generar un código único y temporal (válido por 15 minutos)
    const resetCode = jwt.sign({ id: usuario.id }, 'tu-secreto', { expiresIn: '15m' });

    // Opcional: Guardar el código en la base de datos para validaciones futuras
    await this.usuarios.update({
      where: { id: usuario.id },
      data: { resetCode },
    });

    return resetCode;
  }
  async sendPasswordResetEmail(email: string) {
    const resetCode = await this.generateResetCode(email);
  
    // Llamar al servicio de correo
    await this.emailService.sendResetPasswordEmail(email, resetCode);
  
    return { message: 'Correo de restablecimiento enviado exitosamente' };
  }
  async resetPassword(code: string, newPassword: string) {
  try {
    const decoded = jwt.verify(code, 'tu-secreto');
    const usuarioId = decoded.id;

    // Actualizar la contraseña en la base de datos (asegúrate de cifrarla)
    return this.usuarios.update({
      where: { id: usuarioId },
      data: { password: newPassword, resetCode: null }, // Limpiar el código usado
    });
  } catch (error) {
    throw new NotFoundException('El código es inválido o ha expirado');
  }
}




}
