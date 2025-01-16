import { IsDate, IsDateString, IsISO8601, IsNumber, IsString } from "class-validator"

export class CreateActividadDto {

    @IsString()
    nombre  
    @IsString()     
    descripcion 

    @IsISO8601()
    @IsDateString()
    fecha    
    @IsNumber()    
    materiaId    
    @IsNumber()    
    cursoId  
    @IsNumber()        
    profesorId   
   @IsString()
    foto 


}
