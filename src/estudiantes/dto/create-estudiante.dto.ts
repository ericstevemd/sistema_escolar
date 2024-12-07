import { Type } from "class-transformer"
import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateEstudianteDto {

   
       @IsString()                     
        nombre 
        @IsString()                
        cedula
        @IsString()                 
        genero 
        @IsString()               
        nacionalidad
        
        @IsNotEmpty()
  @IsDate()
  @Type(() => Date) // Transforma el valor en una instancia de Date
 
        fechaNacimiento :Date
        @IsString()
        curso
        @IsNumber()     
        edad       
        @IsBoolean()            
        problemasDiscapacidad  
        @IsString()
        problemasSalud
        @IsString()
        tipoSangre             
        @IsNumber()        
        representanteId   ?:number     
               


}
