import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Pokemon } from '../../pokemon/entities/pokemon.entity';

@Entity()
export class PokemonHabilidad {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  habilidad: string;

  @Column({ default: false })
  es_oculta: boolean;

  @ManyToOne(() => Pokemon, pokemon => pokemon.habilidades)
  pokemon: Pokemon;
}
