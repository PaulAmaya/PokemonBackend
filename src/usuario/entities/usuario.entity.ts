import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Equipo } from '../../equipo/entities/equipo.entity';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  es_admin: boolean;

  @OneToMany(() => Equipo, equipo => equipo.usuario)
  equipos: Equipo[];
}
