import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, BadRequestException } from '@nestjs/common';
import { ProfesorService } from './profesor.service';
import { CreateProfesorDto } from './dto/create-profesor.dto';
import { UpdateProfesorDto } from './dto/update-profesor.dto';
import { CursoService } from 'src/curso/curso.service';

@Controller('profesor')
export class ProfesorController {
  profesor: any;

  constructor(private readonly profesorService: ProfesorService,  private readonly cursoService: CursoService,) {}

  @Post()
  create(@Body() createProfesorDto: CreateProfesorDto) {
    return this.profesorService.create(createProfesorDto);
  }

  @Get()
  findAll() {
    return this.profesorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.profesorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProfesorDto: UpdateProfesorDto) {
    return this.profesorService.update(+id, updateProfesorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.profesorService.remove(+id);
  }
/* 
  @Get(':id/cursos')
  async obtenerCursosPorProfesor(@Param('id') id: String ) {
    // Agregar lógica para filtrar cursos relacionados con el profesor
    const idInt = parseInt(id, 10)
    if (isNaN(idInt)) {
      throw new BadRequestException('El ID debe ser un número entero válido');
    }
  
    const profesor = await this.profesorService.findOne(idInt);
    if (!profesor) {
      throw new NotFoundException('Profesor no encontrado');
    }
  
    return this.cursoService.findAll({ where: { profesorId: idInt } });
  }

 */
  @Get(':id/cursos')
  async getProfesorWithCursos(@Param('id') id: number) {
    return this.profesorService.findProfesorWithCursos(+id);
    

    }
}