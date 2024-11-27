
import { Rol } from "@prisma/client"
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
    
    rol: Rol
              // Puede ser enum en el futuro
    @IsBoolean()
    sesionIniciada :boolean
    @IsBoolean({ message:'isDeleted must be a boolean value'})
    isDeleted :boolean
}
