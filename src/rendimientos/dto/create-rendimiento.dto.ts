import { IsNumber, IsString } from "class-validator"

export class CreateRendimientoDto {
  
@IsNumber()
  estudianteId 
  @IsString()
  tarea   
  @IsString()     
  estado     
  @IsString()  
  observaciones 
  
}
