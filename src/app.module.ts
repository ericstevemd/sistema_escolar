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
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';



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
     AsistenciaModule ,
     ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'), // Directorio donde se almacenan los archivos estáticos
      serveRoot: '/static', // Ruta donde estarán disponibles los archivos estáticos
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
