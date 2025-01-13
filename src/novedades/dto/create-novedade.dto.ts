import { IsDateString, IsISO8601, IsString, } from "class-validator"

export class CreateNovedadeDto {
    @IsString()
  tipo_novedade    
 @IsISO8601()
    @IsDateString()
  fecha  
  @IsString()
  materiaId        
  @IsString()
  descricion       
}
