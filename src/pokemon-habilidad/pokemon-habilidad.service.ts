import { Injectable } from '@nestjs/common';
import { CreatePokemonHabilidadDto } from './dto/create-pokemon-habilidad.dto';
import { UpdatePokemonHabilidadDto } from './dto/update-pokemon-habilidad.dto';

@Injectable()
export class PokemonHabilidadService {
  create(createPokemonHabilidadDto: CreatePokemonHabilidadDto) {
    return 'This action adds a new pokemonHabilidad';
  }

  findAll() {
    return `This action returns all pokemonHabilidad`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pokemonHabilidad`;
  }

  update(id: number, updatePokemonHabilidadDto: UpdatePokemonHabilidadDto) {
    return `This action updates a #${id} pokemonHabilidad`;
  }

  remove(id: number) {
    return `This action removes a #${id} pokemonHabilidad`;
  }
}
