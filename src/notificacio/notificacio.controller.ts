import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NotificacioService } from './notificacio.service';
import { CreateNotificacioDto } from './dto/create-notificacio.dto';
import { UpdateNotificacioDto } from './dto/update-notificacio.dto';

@Controller('notificacio')
export class NotificacioController {
  constructor(private readonly notificacioService: NotificacioService) {}

  @Post()
  create(@Body() createNotificacioDto: CreateNotificacioDto) {
    return this.notificacioService.create(createNotificacioDto);
  }

  @Get()
  findAll() {
    return this.notificacioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notificacioService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNotificacioDto: UpdateNotificacioDto) {
    return this.notificacioService.update(+id, updateNotificacioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notificacioService.remove(+id);
  }
}
