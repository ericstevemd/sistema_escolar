import { IsBoolean, IsEnum, IsNotEmpty, IsString,  } from "class-validator"

export class CreateUsuarioDto {

    @IsString()
    @IsNotEmpty()
    cedula  :String 
    @IsString()  
    @IsNotEmpty()    
    correo   :String
    @IsNotEmpty()
    @IsString()    
    password :String
    
    @IsNotEmpty()
    @IsEnum(['padre', 'profesor', 'directivo'])
    rol: 'padre' | 'profesor' | 'directivo';

              // Puede ser enum en el futuro
    @IsBoolean()
    sesionIniciada :String
}
