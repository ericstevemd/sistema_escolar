import { Test, TestingModule } from '@nestjs/testing';
import { NotificacioService } from './notificacio.service';

describe('NotificacioService', () => {
  let service: NotificacioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotificacioService],
    }).compile();

    service = module.get<NotificacioService>(NotificacioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
