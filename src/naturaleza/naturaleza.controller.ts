import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NaturalezaService } from './naturaleza.service';
import { CreateNaturalezaDto } from './dto/create-naturaleza.dto';
import { UpdateNaturalezaDto } from './dto/update-naturaleza.dto';
import { validateId } from '../common/utils/validate-id.util';

@Controller('naturaleza')
export class NaturalezaController {
  constructor(private readonly naturalezaService: NaturalezaService) {}

  @Post()
  create(@Body() createNaturalezaDto: CreateNaturalezaDto) {
    return this.naturalezaService.create(createNaturalezaDto);
  }

  @Get()
  findAll() {
    return this.naturalezaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const numericId = validateId(id, 'ID de naturaleza');
    return this.naturalezaService.findOne(numericId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNaturalezaDto: UpdateNaturalezaDto) {
    const numericId = validateId(id, 'ID de naturaleza');
    return this.naturalezaService.update(numericId, updateNaturalezaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const numericId = validateId(id, 'ID de naturaleza');
    return this.naturalezaService.remove(numericId);
  }
}
