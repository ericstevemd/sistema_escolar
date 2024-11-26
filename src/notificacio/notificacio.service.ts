import { Injectable } from '@nestjs/common';
import { CreateNotificacioDto } from './dto/create-notificacio.dto';
import { UpdateNotificacioDto } from './dto/update-notificacio.dto';

@Injectable()
export class NotificacioService {
  create(createNotificacioDto: CreateNotificacioDto) {
    return 'This action adds a new notificacio';
  }

  findAll() {
    return `This action returns all notificacio`;
  }

  findOne(id: number) {
    return `This action returns a #${id} notificacio`;
  }

  update(id: number, updateNotificacioDto: UpdateNotificacioDto) {
    return `This action updates a #${id} notificacio`;
  }

  remove(id: number) {
    return `This action removes a #${id} notificacio`;
  }
}
