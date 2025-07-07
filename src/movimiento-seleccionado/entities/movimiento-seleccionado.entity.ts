import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { PokemonEnEquipo } from '../../pokemon-en-equipo/entities/pokemon-en-equipo.entity';
import { Movimiento } from '../../movimiento/entities/movimiento.entity';

@Entity()
export class MovimientoSeleccionado {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => PokemonEnEquipo, pe => pe.movimientos)
  pokemonEnEquipo: PokemonEnEquipo;

  @ManyToOne(() => Movimiento)
  movimiento: Movimiento;
}
