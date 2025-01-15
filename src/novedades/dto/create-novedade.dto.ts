import { IsDateString, IsISO8601, IsNumber, IsString, } from "class-validator"

export class CreateNovedadeDto {
    @IsString()
  tipo_novedade    
 @IsISO8601()
    @IsDateString()
  fecha  
 @IsNumber()
  profesorId        
  @IsString()
  descricion       
}
