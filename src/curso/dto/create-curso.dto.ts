

import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
export class CreateCursoDto {




  @IsString()
  @IsNotEmpty()
  readonly nombreCurso: string;

  @IsString()
  @IsNotEmpty()
  readonly descripcion: string;

  @IsNumber()
  profesorId : number;
  @IsNumber()
  readonly duracion: number; // duración en horas
}

