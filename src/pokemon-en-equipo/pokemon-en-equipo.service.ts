import { Injectable } from '@nestjs/common';
import { CreatePokemonEnEquipoDto } from './dto/create-pokemon-en-equipo.dto';
import { UpdatePokemonEnEquipoDto } from './dto/update-pokemon-en-equipo.dto';

@Injectable()
export class PokemonEnEquipoService {
  create(createPokemonEnEquipoDto: CreatePokemonEnEquipoDto) {
    return 'This action adds a new pokemonEnEquipo';
  }

  findAll() {
    return `This action returns all pokemonEnEquipo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pokemonEnEquipo`;
  }

  update(id: number, updatePokemonEnEquipoDto: UpdatePokemonEnEquipoDto) {
    return `This action updates a #${id} pokemonEnEquipo`;
  }

  remove(id: number) {
    return `This action removes a #${id} pokemonEnEquipo`;
  }
}
