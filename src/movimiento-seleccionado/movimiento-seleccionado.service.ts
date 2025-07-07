import { Injectable } from '@nestjs/common';
import { CreateMovimientoSeleccionadoDto } from './dto/create-movimiento-seleccionado.dto';
import { UpdateMovimientoSeleccionadoDto } from './dto/update-movimiento-seleccionado.dto';

@Injectable()
export class MovimientoSeleccionadoService {
  create(createMovimientoSeleccionadoDto: CreateMovimientoSeleccionadoDto) {
    return 'This action adds a new movimientoSeleccionado';
  }

  findAll() {
    return `This action returns all movimientoSeleccionado`;
  }

  findOne(id: number) {
    return `This action returns a #${id} movimientoSeleccionado`;
  }

  update(id: number, updateMovimientoSeleccionadoDto: UpdateMovimientoSeleccionadoDto) {
    return `This action updates a #${id} movimientoSeleccionado`;
  }

  remove(id: number) {
    return `This action removes a #${id} movimientoSeleccionado`;
  }
}
