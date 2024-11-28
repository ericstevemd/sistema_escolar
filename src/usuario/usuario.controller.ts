
import { Controller, Get, Post, Body, Patch, Param, Delete, Query, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { UsuarioService } from './usuario.service';

import * as jwt from 'jsonwebtoken';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuarioService.create(createUsuarioDto);
  }

  @Get()
  async findAll() {
    return  await this.usuarioService.findAll();
  }

  @Get(':cedula')
  async findOne(@Param('cedula ') cedula: string) {
    return await this.usuarioService.findOne(cedula);
  } 
    
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuarioService.update(+id, updateUsuarioDto);
  }

   @Delete(':id')
  remove(@Param('id') id: string) {
     return this.usuarioService.remove(+id);
  }

  @Post('send-reset-password')
  async sendResetPassword(@Body('correo') correo: string) {
    return this.usuarioService.sendPasswordReset(correo);
  }

  @Post('reset-password')
  async resetPassword(@Query('token') token: string, @Body('newPassword') newPassword: string) {
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      await this.usuarioService.update(payload.id, { password: newPassword });
      return { message: 'Contraseña actualizada con éxito' };
    } catch (error) {
      throw new InternalServerErrorException('Token inválido o expirado');
    }
  }

}