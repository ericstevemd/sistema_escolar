import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RendimientosService } from './rendimientos.service';
import { CreateRendimientoDto } from './dto/create-rendimiento.dto';
import { UpdateRendimientoDto } from './dto/update-rendimiento.dto';

@Controller('rendimientos')
export class RendimientosController {
  constructor(private readonly rendimientosService: RendimientosService) {}

  @Post()
  create(@Body() createRendimientoDto: CreateRendimientoDto) {
    return this.rendimientosService.create(createRendimientoDto);
  }

  @Get()
  findAll() {
    return this.rendimientosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rendimientosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRendimientoDto: UpdateRendimientoDto) {
    return this.rendimientosService.update(+id, updateRendimientoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rendimientosService.remove(+id);
  }
}
