import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IvService } from './iv.service';
import { CreateIvDto } from './dto/create-iv.dto';
import { UpdateIvDto } from './dto/update-iv.dto';
import { validateId } from '../common/utils/validate-id.util';

@Controller('iv')
export class IvController {
  constructor(private readonly ivService: IvService) {}

  @Post()
  create(@Body() createIvDto: CreateIvDto) {
    return this.ivService.create(createIvDto);
  }

  @Get()
  findAll() {
    return this.ivService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const numericId = validateId(id, 'ID de IV');
    return this.ivService.findOne(numericId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIvDto: UpdateIvDto) {
    const numericId = validateId(id, 'ID de IV');
    return this.ivService.update(numericId, updateIvDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const numericId = validateId(id, 'ID de IV');
    return this.ivService.remove(numericId);
  }
}
