// create-asistencia.dto.ts
import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { EstadoAsistencia } from '@prisma/client';

export class CreateAsistenciaDto {
  @IsInt()
  profesorId: number;

  @IsInt()
  cursoId: number;

  @IsInt()
  materiaId: number;

  @IsInt()
  estudianteId: number;

  @IsOptional()
  fecha?: Date;

  @IsEnum(EstadoAsistencia)
  estado: EstadoAsistencia;

  @IsOptional()
  @IsString()
  motivo?: string;
}
