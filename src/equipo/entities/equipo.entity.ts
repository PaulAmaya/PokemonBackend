import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Usuario } from '../../usuario/entities/usuario.entity';
import { PokemonEnEquipo } from '../../pokemon-en-equipo/entities/pokemon-en-equipo.entity';

@Entity()
export class Equipo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @ManyToOne(() => Usuario, usuario => usuario.equipos)
  usuario: Usuario;

  @OneToMany(() => PokemonEnEquipo, pe => pe.equipo)
  pokemones: PokemonEnEquipo[];
}
