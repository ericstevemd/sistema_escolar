import { PartialType } from '@nestjs/swagger';
import { CreateRendimientoDto } from './create-rendimiento.dto';

export class UpdateRendimientoDto extends PartialType(CreateRendimientoDto) {}
