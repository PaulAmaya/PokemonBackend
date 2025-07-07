import {
  Entity, PrimaryGeneratedColumn, ManyToOne, Column, OneToOne, JoinColumn, OneToMany
} from 'typeorm';
import { Equipo } from '../../equipo/entities/equipo.entity';
import { Pokemon } from '../../pokemon/entities/pokemon.entity';
import { Item } from '../../item/entities/item.entity';
import { PokemonHabilidad } from '../../pokemon-habilidad/entities/pokemon-habilidad.entity';
import { Naturaleza } from '../../naturaleza/entities/naturaleza.entity';
import { EV } from '../../ev/entities/ev.entity';
import { IV } from '../../iv/entities/iv.entity';
import { MovimientoSeleccionado } from '../../movimiento-seleccionado/entities/movimiento-seleccionado.entity';

@Entity()
export class PokemonEnEquipo {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Equipo, equipo => equipo.pokemones)
  equipo: Equipo;

  @ManyToOne(() => Pokemon, { eager: true })
  pokemon: Pokemon;

  @Column({ nullable: true })
  apodo: string;

  @ManyToOne(() => Item, { nullable: true })
  item: Item;

  @ManyToOne(() => PokemonHabilidad)
  habilidad: PokemonHabilidad;

  @ManyToOne(() => Naturaleza)
  naturaleza: Naturaleza;

  @OneToOne(() => EV, ev => ev.pokemonEnEquipo, { cascade: true })
  @JoinColumn()
  evs: EV;

  @OneToOne(() => IV, iv => iv.pokemonEnEquipo, { cascade: true })
  @JoinColumn()
  ivs: IV;

  @OneToMany(() => MovimientoSeleccionado, mov => mov.pokemonEnEquipo, { cascade: true })
  movimientos: MovimientoSeleccionado[];
}
