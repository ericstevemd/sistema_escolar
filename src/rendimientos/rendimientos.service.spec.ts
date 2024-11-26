import { Test, TestingModule } from '@nestjs/testing';
import { RendimientosService } from './rendimientos.service';

describe('RendimientosService', () => {
  let service: RendimientosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RendimientosService],
    }).compile();

    service = module.get<RendimientosService>(RendimientosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
