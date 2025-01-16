import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ActividadService } from './actividad.service';
import { CreateActividadDto } from './dto/create-actividad.dto';
import { UpdateActividadDto } from './dto/update-actividad.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer';

@Controller('actividad')
export class ActividadController {
  constructor(private readonly actividadService: ActividadService) {}

 
  @Post()
  @UseInterceptors(
    FileInterceptor('foto', {  // 'foto' es el nombre del campo del formulario
      storage: diskStorage({
        destination: './uploads', // Aquí puedes configurar la carpeta de destino para los archivos
        filename: (req, file, callback) => {
          const filename = `${Date.now()}${extname(file.originalname)}`;
          callback(null, filename);
        },
      }),
    }),
  )
  async create(@Body() createActividadDto: CreateActividadDto, @UploadedFile() file: Express.Multer.File) {
    if (file) {
      // Si el archivo se sube correctamente, se puede incluir en el DTO
      createActividadDto.foto = file.filename;  // Asigna el nombre del archivo al DTO
    }

    return this.actividadService.create(createActividadDto);
  }



  @Get()
  findAll() {
    return this.actividadService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.actividadService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateActividadDto: UpdateActividadDto) {
    return this.actividadService.update(+id, updateActividadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.actividadService.remove(+id);
  }
}

