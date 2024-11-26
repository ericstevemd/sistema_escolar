import { IsBoolean, IsEnum, IsNotEmpty, IsString,  } from "class-validator"

export class CreateUsuarioDto {

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
    @IsEnum(['padre', 'profesor', 'directivo'])
    rol: 'padre' | 'profesor' | 'directivo';

              // Puede ser enum en el futuro
    @IsBoolean()
    sesionIniciada :boolean
}
