import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { PokemonHabilidad } from '../../pokemon-habilidad/entities/pokemon-habilidad.entity';
import { PokemonMovimiento } from '../../pokemon-movimiento/entities/pokemon-movimiento.entity';

@Entity()
export class Pokemon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  tipo1: string;

  @Column({ type: 'varchar', nullable: true })
  tipo2: string | null;

  @Column({ type: 'varchar', nullable: true })
  imagen_url: string | null;

  @Column()
  base_hp: number;

  @Column()
  base_ataque: number;

  @Column()
  base_defensa: number;

  @Column()
  base_sp_ataque: number;

  @Column()
  base_sp_defensa: number;

  @Column()
  base_velocidad: number;

  @OneToMany(() => PokemonHabilidad, ph => ph.pokemon)
  habilidades: PokemonHabilidad[];

  @OneToMany(() => PokemonMovimiento, pm => pm.pokemon)
  movimientos: PokemonMovimiento[];
}
