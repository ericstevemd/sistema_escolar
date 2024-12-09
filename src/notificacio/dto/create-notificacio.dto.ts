import { IsDate, IsNumber, IsString } from "class-validator"

export class CreateNotificacioDto {
 

@IsNumber()  
    usuarioId 
    @IsString()
    mensaje 
@IsDate()
    fecha   
    @IsString()   
    tipo
  
}
