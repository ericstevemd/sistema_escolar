import { PartialType } from '@nestjs/swagger';
import { CreateNotificacioDto } from './create-notificacio.dto';

export class UpdateNotificacioDto extends PartialType(CreateNotificacioDto) {}
