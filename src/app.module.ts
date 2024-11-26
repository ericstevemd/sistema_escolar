import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { RepresentantesModule } from './representantes/representantes.module';
import { EstudiantesModule } from './estudiantes/estudiantes.module';
import { ProfesorModule } from './profesor/profesor.module';
import { MateriasModule } from './materias/materias.module';
import { ActividadModule } from './actividad/actividad.module';
import { RendimientosModule } from './rendimientos/rendimientos.module';
import { NotificacioModule } from './notificacio/notificacio.module';

@Module({
  imports: [UsuarioModule, RepresentantesModule, EstudiantesModule, ProfesorModule, MateriasModule, ActividadModule, RendimientosModule, NotificacioModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
