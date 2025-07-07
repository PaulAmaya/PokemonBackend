import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { NaturalezaService } from './naturaleza.service';
import { CreateNaturalezaDto } from './dto/create-naturaleza.dto';
import { UpdateNaturalezaDto } from './dto/update-naturaleza.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AdminGuard } from '../auth/admin.guard';
import { validateId } from '../common/utils/validate-id.util';

@Controller('naturalezas')
export class NaturalezaController {
  constructor(private readonly naturalezaService: NaturalezaService) {}

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Post()
  create(@Body() createNaturalezaDto: CreateNaturalezaDto) {
    return this.naturalezaService.create(createNaturalezaDto);
  }

  @Get()
  findAll() {
    return this.naturalezaService.findAll();
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Post('seed')
  seedNaturalezas() {
    return this.naturalezaService.seedNaturalezas();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const numericId = validateId(id, 'ID de naturaleza');
    return this.naturalezaService.findOne(numericId);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNaturalezaDto: UpdateNaturalezaDto) {
    const numericId = validateId(id, 'ID de naturaleza');
    return this.naturalezaService.update(numericId, updateNaturalezaDto);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    const numericId = validateId(id, 'ID de naturaleza');
    return this.naturalezaService.remove(numericId);
  }
}
