import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PokemonMovimientoService } from './pokemon-movimiento.service';
import { CreatePokemonMovimientoDto } from './dto/create-pokemon-movimiento.dto';
import { UpdatePokemonMovimientoDto } from './dto/update-pokemon-movimiento.dto';
import { validateId } from '../common/utils/validate-id.util';

@Controller('pokemon-movimiento')
export class PokemonMovimientoController {
  constructor(private readonly pokemonMovimientoService: PokemonMovimientoService) {}

  @Post()
  create(@Body() createPokemonMovimientoDto: CreatePokemonMovimientoDto) {
    return this.pokemonMovimientoService.create(createPokemonMovimientoDto);
  }

  @Get()
  findAll() {
    return this.pokemonMovimientoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const numericId = validateId(id, 'ID de pokemon-movimiento');
    return this.pokemonMovimientoService.findOne(numericId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePokemonMovimientoDto: UpdatePokemonMovimientoDto) {
    const numericId = validateId(id, 'ID de pokemon-movimiento');
    return this.pokemonMovimientoService.update(numericId, updatePokemonMovimientoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const numericId = validateId(id, 'ID de pokemon-movimiento');
    return this.pokemonMovimientoService.remove(numericId);
  }
}
