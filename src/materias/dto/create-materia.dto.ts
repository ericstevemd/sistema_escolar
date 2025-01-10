import { IsNumber, IsString } from "class-validator";

export class CreateMateriaDto {

@IsString()
nombreMateria
@IsNumber()
profesorId
       
      }

