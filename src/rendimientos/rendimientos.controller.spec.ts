import { Test, TestingModule } from '@nestjs/testing';
import { RendimientosController } from './rendimientos.controller';
import { RendimientosService } from './rendimientos.service';

describe('RendimientosController', () => {
  let controller: RendimientosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RendimientosController],
      providers: [RendimientosService],
    }).compile();

    controller = module.get<RendimientosController>(RendimientosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
