import { Module } from '@nestjs/common';
import { ProfesorService } from './profesor.service';
import { ProfesorController } from './profesor.controller';
import { CursoModule } from 'src/curso/curso.module';

@Module({
  controllers: [ProfesorController],
  providers: [ProfesorService],
  imports: [CursoModule],
})
export class ProfesorModule {}
