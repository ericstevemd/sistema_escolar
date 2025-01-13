import { IsString, } from "class-validator"

export class CreateNovedadeDto {
    @IsString()
  tipo_novedade    

  fecha  
  @IsString()
  materiaId        
  @IsString()
  descricion       
}
