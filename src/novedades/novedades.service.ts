import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateNovedadeDto } from './dto/create-novedade.dto';
import { UpdateNovedadeDto } from './dto/update-novedade.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class NovedadesService extends PrismaClient implements OnModuleInit {
  
 async onModuleInit() {
await this.$connect();
  }
 async create(createNovedadeDto: CreateNovedadeDto) {
    return await this.novedades.create({
      data:createNovedadeDto
    })
  }

  findAll() {
    return `This action returns all novedades`;
  }

  findOne(id: number) {
    return `This action returns a #${id} novedade`;
  }

  update(id: number, updateNovedadeDto: UpdateNovedadeDto) {
    return `This action updates a #${id} novedade`;
  }

  remove(id: number) {
    return `This action removes a #${id} novedade`;
  }
}
