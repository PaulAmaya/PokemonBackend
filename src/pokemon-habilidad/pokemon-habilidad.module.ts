import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PokemonHabilidadService } from './pokemon-habilidad.service';
import { PokemonHabilidadController } from './pokemon-habilidad.controller';
import { PokemonHabilidad } from './entities/pokemon-habilidad.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PokemonHabilidad])],
  controllers: [PokemonHabilidadController],
  providers: [PokemonHabilidadService],
  exports: [PokemonHabilidadService],
})
export class PokemonHabilidadModule {}
