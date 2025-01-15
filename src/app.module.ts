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
import { NotificacioModule  } from './notificacio/notificacio.module';
import { EmailModule } from './email/email.module';
import { ConfigModule  ,ConfigService} from '@nestjs/config';
import { CursoModule } from './curso/curso.module';
import { NovedadesModule } from './novedades/novedades.module';
import { AsistenciaModule } from './asistencia/asistencia.module';



@Module({
  imports: [
ConfigModule.forRoot({
  isGlobal:true,
}),    
    UsuarioModule,
    RepresentantesModule,
     EstudiantesModule, 
     ProfesorModule,
      MateriasModule,
       ActividadModule,
        RendimientosModule,
         NotificacioModule,
     EmailModule,
     CursoModule,
     NovedadesModule,
     AsistenciaModule 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
