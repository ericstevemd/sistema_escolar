import { IsNotEmpty, IsNumber, IsString, IsEmail, IsPhoneNumber } from "class-validator";

export class CreateRepresentanteDto {

  @IsString()             
  @IsNotEmpty()
  nombre: string;

  @IsString()                
  @IsNotEmpty()
  apellido: string;

  @IsString() 
  @IsNotEmpty()
  cedula: string; 

  @IsString()               
  @IsNotEmpty()
  nacionalidad: string;

  @IsString()          
  @IsNotEmpty()
  ciudad: string;

  @IsEmail()                
  @IsNotEmpty()
  correo: string;

  @IsString()               
  @IsNotEmpty()
  direccion_Domicilio: string;

  @IsString()  
  @IsNotEmpty()
  foto: string;

  @IsString()  
  @IsNotEmpty()
           // Valida que el número sea un teléfono válido
  numeroCelular1: string;

  @IsString()        
  @IsNotEmpty()
  // Valida que el número sea un teléfono válido
  numeroCelular2: string;

  @IsString()         
  @IsNotEmpty()
               // Valida que el número sea un teléfono válido
  numeroCelular3: string;

  @IsString()        
  @IsNotEmpty()
  genero: string;

  @IsNumber()
  @IsNotEmpty()
  cantidadRepresentados: number;

  @IsString()           
  @IsNotEmpty()
  personasNoAutorizadas: string;
}
