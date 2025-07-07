import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PokemonEnEquipoService } from './pokemon-en-equipo.service';
import { CreatePokemonEnEquipoDto } from './dto/create-pokemon-en-equipo.dto';
import { UpdatePokemonEnEquipoDto } from './dto/update-pokemon-en-equipo.dto';
import { validateId } from '../common/utils/validate-id.util';

@Controller('pokemon-en-equipo')
export class PokemonEnEquipoController {
  constructor(private readonly pokemonEnEquipoService: PokemonEnEquipoService) {}

  @Post()
  create(@Body() createPokemonEnEquipoDto: CreatePokemonEnEquipoDto) {
    return this.pokemonEnEquipoService.create(createPokemonEnEquipoDto);
  }

  @Get()
  findAll() {
    return this.pokemonEnEquipoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const numericId = validateId(id, 'ID de pokemon-en-equipo');
    return this.pokemonEnEquipoService.findOne(numericId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePokemonEnEquipoDto: UpdatePokemonEnEquipoDto) {
    const numericId = validateId(id, 'ID de pokemon-en-equipo');
    return this.pokemonEnEquipoService.update(numericId, updatePokemonEnEquipoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const numericId = validateId(id, 'ID de pokemon-en-equipo');
    return this.pokemonEnEquipoService.remove(numericId);
  }
}
