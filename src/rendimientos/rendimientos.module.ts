import { Module } from '@nestjs/common';
import { RendimientosService } from './rendimientos.service';
import { RendimientosController } from './rendimientos.controller';

@Module({
  controllers: [RendimientosController],
  providers: [RendimientosService],
})
export class RendimientosModule {}
