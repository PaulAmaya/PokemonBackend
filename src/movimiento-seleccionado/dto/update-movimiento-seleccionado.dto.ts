import { PartialType } from '@nestjs/mapped-types';
import { CreateMovimientoSeleccionadoDto } from './create-movimiento-seleccionado.dto';

export class UpdateMovimientoSeleccionadoDto extends PartialType(CreateMovimientoSeleccionadoDto) {}
