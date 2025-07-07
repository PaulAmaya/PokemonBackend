import { PartialType } from '@nestjs/mapped-types';
import { CreatePokemonEnEquipoDto } from './create-pokemon-en-equipo.dto';

export class UpdatePokemonEnEquipoDto extends PartialType(CreatePokemonEnEquipoDto) {}
