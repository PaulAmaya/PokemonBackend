import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EquipoService } from './equipo.service';
import { EquipoController } from './equipo.controller';
import { Equipo } from './entities/equipo.entity';
import { Usuario } from '../usuario/entities/usuario.entity';
import { Pokemon } from '../pokemon/entities/pokemon.entity';
import { PokemonEnEquipo } from '../pokemon-en-equipo/entities/pokemon-en-equipo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Equipo, Usuario, Pokemon, PokemonEnEquipo])],
  controllers: [EquipoController],
  providers: [EquipoService],
  exports: [EquipoService],
})
export class EquipoModule {}
