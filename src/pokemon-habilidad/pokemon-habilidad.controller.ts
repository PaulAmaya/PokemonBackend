import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PokemonHabilidadService } from './pokemon-habilidad.service';
import { CreatePokemonHabilidadDto } from './dto/create-pokemon-habilidad.dto';
import { UpdatePokemonHabilidadDto } from './dto/update-pokemon-habilidad.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AdminGuard } from '../auth/admin.guard';
import { validateId } from '../common/utils/validate-id.util';

@Controller('pokemon-habilidades')
export class PokemonHabilidadController {
  constructor(private readonly pokemonHabilidadService: PokemonHabilidadService) {}

  @UseGuards(JwtAuthGuard, AdminGuard)
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

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePokemonHabilidadDto: UpdatePokemonHabilidadDto) {
    const numericId = validateId(id, 'ID de pokemon-habilidad');
    return this.pokemonHabilidadService.update(numericId, updatePokemonHabilidadDto);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    const numericId = validateId(id, 'ID de pokemon-habilidad');
    return this.pokemonHabilidadService.remove(numericId);
  }
}
