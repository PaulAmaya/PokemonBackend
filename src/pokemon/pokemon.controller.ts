import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req, BadRequestException, UseGuards } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { UpdatePokemonImageDto } from './dto/update-pokemon-image.dto';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AdminGuard } from '../auth/admin.guard';
import { validateId } from '../common/utils/validate-id.util';

interface RequestWithFiles extends Request {
  files?: any;
}

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  // Solo admins pueden crear Pokémon
  @UseGuards(JwtAuthGuard, AdminGuard)
  @Post()
  create(@Body() createPokemonDto: CreatePokemonDto) {
    return this.pokemonService.create(createPokemonDto);
  }

  @Get()
  findAll() {
    return this.pokemonService.findAll();
  }

  @Get('stats')
  getStats() {
    return this.pokemonService.getStats();
  }

  @Get('search')
  findByName(@Query('nombre') nombre: string) {
    if (!nombre) {
      return { error: 'El parámetro nombre es requerido' };
    }
    return this.pokemonService.findByName(nombre);
  }

  @Get('tipo/:tipo')
  findByType(@Param('tipo') tipo: string) {
    return this.pokemonService.findByType(tipo);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const pokemonId = validateId(id, 'ID de Pokémon');
    return this.pokemonService.findOne(pokemonId);
  }

  // Solo admins pueden actualizar Pokémon
  @UseGuards(JwtAuthGuard, AdminGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePokemonDto: UpdatePokemonDto) {
    const pokemonId = validateId(id, 'ID de Pokémon');
    return this.pokemonService.update(pokemonId, updatePokemonDto);
  }

  // Solo admins pueden eliminar Pokémon
  @UseGuards(JwtAuthGuard, AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    const pokemonId = validateId(id, 'ID de Pokémon');
    return this.pokemonService.remove(pokemonId);
  }

  @Get('sin-imagen')
  findPokemonWithoutImage() {
    return this.pokemonService.findPokemonWithoutImage();
  }

  @Get('con-imagen')
  findPokemonWithImage() {
    return this.pokemonService.findPokemonWithImage();
  }

  // Solo admins pueden actualizar imagen por URL
  @UseGuards(JwtAuthGuard, AdminGuard)
  @Patch(':id/imagen')
  updateImage(@Param('id') id: string, @Body() updateImageDto: UpdatePokemonImageDto) {
    const pokemonId = validateId(id, 'ID de Pokémon');
    return this.pokemonService.updateImage(pokemonId, updateImageDto.imagen_url);
  }

  // Solo admins pueden eliminar imagen
  @UseGuards(JwtAuthGuard, AdminGuard)
  @Delete(':id/imagen')
  removeImage(@Param('id') id: string) {
    const pokemonId = validateId(id, 'ID de Pokémon');
    return this.pokemonService.removeImage(pokemonId);
  }

  // Solo admins pueden subir imagen como archivo
  @UseGuards(JwtAuthGuard, AdminGuard)
  @Post(':id/upload-image')
  async uploadImage(@Param('id') id: string, @Req() req: RequestWithFiles) {
    if (!req.files || !req.files.imagen) {
      throw new BadRequestException('No se ha enviado ningún archivo. El campo debe llamarse "imagen"');
    }

    const pokemonId = validateId(id, 'ID de Pokémon');
    const file = req.files.imagen;
    return this.pokemonService.uploadImage(pokemonId, file);
  }
}
