import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioDto } from './create-usuario.dto';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { Rol } from '@prisma/client';

export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {


    @IsString()
    @IsNotEmpty()
    cedula  :string 
    @IsString()  
    @IsNotEmpty()    
    correo   :string
    @IsNotEmpty()
    @IsString()    
    password :string
    
    @IsNotEmpty()
    
    rol: Rol
              // Puede ser enum en el futuro
    @IsBoolean()
    sesionIniciada :boolean


}
