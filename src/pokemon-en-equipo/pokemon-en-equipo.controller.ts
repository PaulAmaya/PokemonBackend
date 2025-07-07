import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PokemonEnEquipoService } from './pokemon-en-equipo.service';
import { CreatePokemonEnEquipoDto } from './dto/create-pokemon-en-equipo.dto';
import { UpdatePokemonEnEquipoDto } from './dto/update-pokemon-en-equipo.dto';
import { UpdatePokemonStatsDto } from './dto/update-pokemon-stats.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { validateId } from '../common/utils/validate-id.util';

@Controller('pokemon-en-equipo')
export class PokemonEnEquipoController {
  constructor(private readonly pokemonEnEquipoService: PokemonEnEquipoService) {}

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePokemonEnEquipoDto: UpdatePokemonEnEquipoDto) {
    const numericId = validateId(id, 'ID de pokemon-en-equipo');
    return this.pokemonEnEquipoService.update(numericId, updatePokemonEnEquipoDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/stats')
  updateStats(@Param('id') id: string, @Body() updateStatsDto: UpdatePokemonStatsDto) {
    const numericId = validateId(id, 'ID de pokemon-en-equipo');
    return this.pokemonEnEquipoService.updateStats(numericId, updateStatsDto);
  }

  @Get(':id/final-stats')
  getFinalStats(@Param('id') id: string) {
    const numericId = validateId(id, 'ID de pokemon-en-equipo');
    return this.pokemonEnEquipoService.calculateFinalStats(numericId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    const numericId = validateId(id, 'ID de pokemon-en-equipo');
    return this.pokemonEnEquipoService.remove(numericId);
  }
}
