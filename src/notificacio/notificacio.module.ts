import { Module } from '@nestjs/common';
import { NotificacioService } from './notificacio.service';
import { NotificacioController } from './notificacio.controller';

@Module({
  controllers: [NotificacioController],
  providers: [NotificacioService],
})
export class NotificacioModule {}
