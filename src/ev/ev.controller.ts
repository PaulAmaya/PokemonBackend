import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EvService } from './ev.service';
import { CreateEvDto } from './dto/create-ev.dto';
import { UpdateEvDto } from './dto/update-ev.dto';
import { validateId } from '../common/utils/validate-id.util';

@Controller('ev')
export class EvController {
  constructor(private readonly evService: EvService) {}

  @Post()
  create(@Body() createEvDto: CreateEvDto) {
    return this.evService.create(createEvDto);
  }

  @Get()
  findAll() {
    return this.evService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const numericId = validateId(id, 'ID de EV');
    return this.evService.findOne(numericId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEvDto: UpdateEvDto) {
    const numericId = validateId(id, 'ID de EV');
    return this.evService.update(numericId, updateEvDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const numericId = validateId(id, 'ID de EV');
    return this.evService.remove(numericId);
  }
}
