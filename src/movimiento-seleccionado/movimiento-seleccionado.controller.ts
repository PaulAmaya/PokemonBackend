import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MovimientoSeleccionadoService } from './movimiento-seleccionado.service';
import { CreateMovimientoSeleccionadoDto } from './dto/create-movimiento-seleccionado.dto';
import { UpdateMovimientoSeleccionadoDto } from './dto/update-movimiento-seleccionado.dto';
import { validateId } from '../common/utils/validate-id.util';

@Controller('movimiento-seleccionado')
export class MovimientoSeleccionadoController {
  constructor(private readonly movimientoSeleccionadoService: MovimientoSeleccionadoService) {}

  @Post()
  create(@Body() createMovimientoSeleccionadoDto: CreateMovimientoSeleccionadoDto) {
    return this.movimientoSeleccionadoService.create(createMovimientoSeleccionadoDto);
  }

  @Get()
  findAll() {
    return this.movimientoSeleccionadoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const numericId = validateId(id, 'ID de movimiento-seleccionado');
    return this.movimientoSeleccionadoService.findOne(numericId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMovimientoSeleccionadoDto: UpdateMovimientoSeleccionadoDto) {
    const numericId = validateId(id, 'ID de movimiento-seleccionado');
    return this.movimientoSeleccionadoService.update(numericId, updateMovimientoSeleccionadoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const numericId = validateId(id, 'ID de movimiento-seleccionado');
    return this.movimientoSeleccionadoService.remove(numericId);
  }
}
