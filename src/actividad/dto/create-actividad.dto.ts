import { IsDate, IsNumber, IsString } from "class-validator"

export class CreateActividadDto {

    @IsString()
    nombre  
    @IsString()     
    descripcion 
    @IsDate() 
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
