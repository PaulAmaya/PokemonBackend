import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PokemonEnEquipoService } from './pokemon-en-equipo.service';
import { PokemonEnEquipoController } from './pokemon-en-equipo.controller';
import { PokemonEnEquipo } from './entities/pokemon-en-equipo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PokemonEnEquipo])],
  controllers: [PokemonEnEquipoController],
  providers: [PokemonEnEquipoService],
  exports: [PokemonEnEquipoService],
})
export class PokemonEnEquipoModule {}
