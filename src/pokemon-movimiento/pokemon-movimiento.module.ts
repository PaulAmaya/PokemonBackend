import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PokemonMovimientoService } from './pokemon-movimiento.service';
import { PokemonMovimientoController } from './pokemon-movimiento.controller';
import { PokemonMovimiento } from './entities/pokemon-movimiento.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PokemonMovimiento])],
  controllers: [PokemonMovimientoController],
  providers: [PokemonMovimientoService],
  exports: [PokemonMovimientoService],
})
export class PokemonMovimientoModule {}
