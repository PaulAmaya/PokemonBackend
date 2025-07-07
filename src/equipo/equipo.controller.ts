import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { EquipoService } from './equipo.service';
import { CreateEquipoDto } from './dto/create-equipo.dto';
import { UpdateEquipoDto } from './dto/update-equipo.dto';
import { AddPokemonToEquipoDto } from './dto/add-pokemon-to-equipo.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AdminGuard } from '../auth/admin.guard';
import { validateId } from '../common/utils/validate-id.util';

@Controller('equipo')
export class EquipoController {
  constructor(private readonly equipoService: EquipoService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createEquipoDto: CreateEquipoDto, @Request() req) {
    return this.equipoService.create(createEquipoDto, req.user.userId);
  }

  @Get()
  findAll() {
    return this.equipoService.findAll();
  }

  @Get('detailed')
  findAllDetailed() {
    return this.equipoService.findAllDetailed();
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Get('user/:userId')
  findByUser(@Param('userId') userId: string) {
    const numericUserId = validateId(userId, 'ID de usuario');
    return this.equipoService.findByUser(numericUserId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('my-equipos')
  findMyEquipos(@Request() req) {
    return this.equipoService.findByUser(req.user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const numericId = validateId(id, 'ID de equipo');
    return this.equipoService.findOne(numericId);
  }

  @Get(':id/stats')
  getEquipoStats(@Param('id') id: string) {
    const numericId = validateId(id, 'ID de equipo');
    return this.equipoService.getEquipoStats(numericId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEquipoDto: UpdateEquipoDto) {
    const numericId = validateId(id, 'ID de equipo');
    return this.equipoService.update(numericId, updateEquipoDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/add-pokemon')
  addPokemonToEquipo(@Param('id') id: string, @Body() addPokemonDto: AddPokemonToEquipoDto) {
    const numericId = validateId(id, 'ID de equipo');
    return this.equipoService.addPokemonToEquipo(numericId, addPokemonDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id/remove-pokemon/:pokemonId')
  removePokemonFromEquipo(@Param('id') id: string, @Param('pokemonId') pokemonId: string) {
    const numericId = validateId(id, 'ID de equipo');
    const numericPokemonId = validateId(pokemonId, 'ID de pokemon');
    return this.equipoService.removePokemonFromEquipo(numericId, numericPokemonId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    const numericId = validateId(id, 'ID de equipo');
    return this.equipoService.remove(numericId);
  }
}
