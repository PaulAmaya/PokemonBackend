import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PokemonEnEquipoService } from './pokemon-en-equipo.service';
import { PokemonEnEquipoController } from './pokemon-en-equipo.controller';
import { PokemonStatsCalculatorService } from './pokemon-stats-calculator.service';
import { PokemonEnEquipo } from './entities/pokemon-en-equipo.entity';
import { Equipo } from '../equipo/entities/equipo.entity';
import { Pokemon } from '../pokemon/entities/pokemon.entity';
import { Item } from '../item/entities/item.entity';
import { PokemonHabilidad } from '../pokemon-habilidad/entities/pokemon-habilidad.entity';
import { Naturaleza } from '../naturaleza/entities/naturaleza.entity';
import { EV } from '../ev/entities/ev.entity';
import { IV } from '../iv/entities/iv.entity';
import { MovimientoSeleccionado } from '../movimiento-seleccionado/entities/movimiento-seleccionado.entity';
import { Movimiento } from '../movimiento/entities/movimiento.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    PokemonEnEquipo,
    Equipo,
    Pokemon,
    Item,
    PokemonHabilidad,
    Naturaleza,
    EV,
    IV,
    MovimientoSeleccionado,
    Movimiento
  ])],
  controllers: [PokemonEnEquipoController],
  providers: [PokemonEnEquipoService, PokemonStatsCalculatorService],
  exports: [PokemonEnEquipoService, PokemonStatsCalculatorService],
})
export class PokemonEnEquipoModule {}
