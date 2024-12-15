import { Type } from "class-transformer";
import { IsBoolean, IsDate, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateEstudianteDto {

    @IsString()                     
    nombre: string;

    @IsString()                
    cedula: string;

    @IsString()                  
    genero: string;

    @IsString()               
    nacionalidad: string;
        
    @IsDateString()
    fechaNacimiento: string;

    @IsString()
    curso: string;

    @IsNumber()     
    edad: number;

    @IsBoolean()            
    problemasDiscapacidad: boolean;

    @IsString()
    problemasSalud: string;

    @IsString()
    tipoSangre: string;

    @IsOptional() // Marca como opcional, ya que no es obligatorio
    @IsNumber()        
    representanteId?: number;   
}
