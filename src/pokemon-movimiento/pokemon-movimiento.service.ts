import { Injectable } from '@nestjs/common';
import { CreatePokemonMovimientoDto } from './dto/create-pokemon-movimiento.dto';
import { UpdatePokemonMovimientoDto } from './dto/update-pokemon-movimiento.dto';

@Injectable()
export class PokemonMovimientoService {
  create(createPokemonMovimientoDto: CreatePokemonMovimientoDto) {
    return 'This action adds a new pokemonMovimiento';
  }

  findAll() {
    return `This action returns all pokemonMovimiento`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pokemonMovimiento`;
  }

  update(id: number, updatePokemonMovimientoDto: UpdatePokemonMovimientoDto) {
    return `This action updates a #${id} pokemonMovimiento`;
  }

  remove(id: number) {
    return `This action removes a #${id} pokemonMovimiento`;
  }
}
