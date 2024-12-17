import { Type } from "class-transformer";
import { IsBoolean, IsDateString, IsISO8601,  IsNumber, IsOptional, IsString } from "class-validator";

export class CreateEstudianteDto {

    @IsString()                     
    nombre: string;

    @IsString()                
    cedula: string;

    @IsString()                  
    genero: string;

    @IsString()               
    nacionalidad: string;
    @IsISO8601()
    @IsDateString()
    fechaNacimiento: Date;

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
