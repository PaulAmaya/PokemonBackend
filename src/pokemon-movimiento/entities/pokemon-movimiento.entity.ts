import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Pokemon } from '../../pokemon/entities/pokemon.entity';
import { Movimiento } from '../../movimiento/entities/movimiento.entity';

@Entity()
export class PokemonMovimiento {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Pokemon, pokemon => pokemon.movimientos)
  pokemon: Pokemon;

  @ManyToOne(() => Movimiento, movimiento => movimiento.pokemonMovimientos)
  movimiento: Movimiento;
}
