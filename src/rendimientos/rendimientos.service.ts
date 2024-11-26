import { Injectable } from '@nestjs/common';
import { CreateRendimientoDto } from './dto/create-rendimiento.dto';
import { UpdateRendimientoDto } from './dto/update-rendimiento.dto';

@Injectable()
export class RendimientosService {
  create(createRendimientoDto: CreateRendimientoDto) {
    return 'This action adds a new rendimiento';
  }

  findAll() {
    return `This action returns all rendimientos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} rendimiento`;
  }

  update(id: number, updateRendimientoDto: UpdateRendimientoDto) {
    return `This action updates a #${id} rendimiento`;
  }

  remove(id: number) {
    return `This action removes a #${id} rendimiento`;
  }
}
