
import { Controller, Get, Post, Body, Patch, Param, Delete, Query, BadRequestException } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
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


  @Post('reset-password')
  async sendResetPasswordEmail(@Body('email') email: string) {
    return this.usuarioService.sendPasswordResetEmail(email);


}


@Post('reset-password/confirm')
async resetPassword(
  @Body('code') code: string,
  @Body('newPassword') newPassword: string,
) {
  return this.usuarioService.resetPassword(code, newPassword);
}
}