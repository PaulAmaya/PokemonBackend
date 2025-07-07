import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { PokemonMovimiento } from '../../pokemon-movimiento/entities/pokemon-movimiento.entity';

@Entity()
export class Movimiento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  tipo: string;

  @Column()
  categoria: string; // físico, especial, estado

  @Column({ nullable: true })
  poder: number;

  @Column()
  descripcion: string;

  @Column({ nullable: true })
  imagen_url: string;

  @OneToMany(() => PokemonMovimiento, pm => pm.movimiento)
  pokemonMovimientos: PokemonMovimiento[];
}
