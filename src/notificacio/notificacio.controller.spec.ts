import { Test, TestingModule } from '@nestjs/testing';
import { NotificacioController } from './notificacio.controller';
import { NotificacioService } from './notificacio.service';

describe('NotificacioController', () => {
  let controller: NotificacioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotificacioController],
      providers: [NotificacioService],
    }).compile();

    controller = module.get<NotificacioController>(NotificacioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
