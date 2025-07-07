import { PartialType } from '@nestjs/mapped-types';
import { CreatePokemonMovimientoDto } from './create-pokemon-movimiento.dto';

export class UpdatePokemonMovimientoDto extends PartialType(CreatePokemonMovimientoDto) {}
