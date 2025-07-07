import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Naturaleza {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  stat_beneficiado: string;

  @Column()
  stat_perjudicado: string;
}
