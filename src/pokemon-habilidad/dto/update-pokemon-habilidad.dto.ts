import { PartialType } from '@nestjs/mapped-types';
import { CreatePokemonHabilidadDto } from './create-pokemon-habilidad.dto';

export class UpdatePokemonHabilidadDto extends PartialType(CreatePokemonHabilidadDto) {}
