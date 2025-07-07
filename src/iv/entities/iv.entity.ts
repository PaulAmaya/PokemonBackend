import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { PokemonEnEquipo } from '../../pokemon-en-equipo/entities/pokemon-en-equipo.entity';

@Entity()
export class IV {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  hp: number;

  @Column()
  ataque: number;

  @Column()
  defensa: number;

  @Column()
  sp_ataque: number;

  @Column()
  sp_defensa: number;

  @Column()
  velocidad: number;

  @OneToOne(() => PokemonEnEquipo, pe => pe.ivs)
  pokemonEnEquipo: PokemonEnEquipo;
}
