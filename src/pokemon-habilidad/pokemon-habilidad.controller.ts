import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PokemonHabilidadService } from './pokemon-habilidad.service';
import { CreatePokemonHabilidadDto } from './dto/create-pokemon-habilidad.dto';
import { UpdatePokemonHabilidadDto } from './dto/update-pokemon-habilidad.dto';
import { validateId } from '../common/utils/validate-id.util';

@Controller('pokemon-habilidad')
export class PokemonHabilidadController {
  constructor(private readonly pokemonHabilidadService: PokemonHabilidadService) {}

  @Post()
  create(@Body() createPokemonHabilidadDto: CreatePokemonHabilidadDto) {
    return this.pokemonHabilidadService.create(createPokemonHabilidadDto);
  }

  @Get()
  findAll() {
    return this.pokemonHabilidadService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const numericId = validateId(id, 'ID de pokemon-habilidad');
    return this.pokemonHabilidadService.findOne(numericId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePokemonHabilidadDto: UpdatePokemonHabilidadDto) {
    const numericId = validateId(id, 'ID de pokemon-habilidad');
    return this.pokemonHabilidadService.update(numericId, updatePokemonHabilidadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const numericId = validateId(id, 'ID de pokemon-habilidad');
    return this.pokemonHabilidadService.remove(numericId);
  }
}
