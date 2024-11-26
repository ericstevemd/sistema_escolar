import { IsNumber, IsString } from "class-validator"

export class CreateRepresentanteDto {

    @IsString()             
    nombre :string 
    @IsString()                
    apellido:string 
    @IsString()
    cedula :string 
    @IsString()               
    nacionalidad :string 
    @IsString()          
    ciudad :string 
    @IsString()               
    correo  :string
    @IsString()               
    direccion_Domicilio :string  
    @IsString()
    foto  :string
    @IsString()                
    numeroCelular1:string 
    @IsString()        
    numeroCelular2:string
    @IsString()         
    numeroCelular3:string
    @IsString()        
    genero   :string 
    @IsNumber()
    cantidadRepresentados :number 
    @IsString()           
    personasNoAutorizadas :string 


}
