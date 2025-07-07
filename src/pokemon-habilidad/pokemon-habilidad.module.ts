import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PokemonHabilidadService } from './pokemon-habilidad.service';
import { PokemonHabilidadController } from './pokemon-habilidad.controller';
import { PokemonHabilidad } from './entities/pokemon-habilidad.entity';
import { Pokemon } from '../pokemon/entities/pokemon.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PokemonHabilidad, Pokemon])],
  controllers: [PokemonHabilidadController],
  providers: [PokemonHabilidadService],
  exports: [PokemonHabilidadService],
})
export class PokemonHabilidadModule {}
