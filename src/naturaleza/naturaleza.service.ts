import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNaturalezaDto } from './dto/create-naturaleza.dto';
import { UpdateNaturalezaDto } from './dto/update-naturaleza.dto';
import { Naturaleza } from './entities/naturaleza.entity';

const NATURALEZAS_OFICIALES = [
  { nombre: 'Hardy', stat_beneficiado: 'ninguno', stat_perjudicado: 'ninguno' },
  { nombre: 'Lonely', stat_beneficiado: 'ataque', stat_perjudicado: 'defensa' },
  { nombre: 'Brave', stat_beneficiado: 'ataque', stat_perjudicado: 'velocidad' },
  { nombre: 'Adamant', stat_beneficiado: 'ataque', stat_perjudicado: 'sp_ataque' },
  { nombre: 'Naughty', stat_beneficiado: 'ataque', stat_perjudicado: 'sp_defensa' },
  { nombre: 'Bold', stat_beneficiado: 'defensa', stat_perjudicado: 'ataque' },
  { nombre: 'Docile', stat_beneficiado: 'ninguno', stat_perjudicado: 'ninguno' },
  { nombre: 'Relaxed', stat_beneficiado: 'defensa', stat_perjudicado: 'velocidad' },
  { nombre: 'Impish', stat_beneficiado: 'defensa', stat_perjudicado: 'sp_ataque' },
  { nombre: 'Lax', stat_beneficiado: 'defensa', stat_perjudicado: 'sp_defensa' },
  { nombre: 'Timid', stat_beneficiado: 'velocidad', stat_perjudicado: 'ataque' },
  { nombre: 'Hasty', stat_beneficiado: 'velocidad', stat_perjudicado: 'defensa' },
  { nombre: 'Serious', stat_beneficiado: 'ninguno', stat_perjudicado: 'ninguno' },
  { nombre: 'Jolly', stat_beneficiado: 'velocidad', stat_perjudicado: 'sp_ataque' },
  { nombre: 'Naive', stat_beneficiado: 'velocidad', stat_perjudicado: 'sp_defensa' },
  { nombre: 'Modest', stat_beneficiado: 'sp_ataque', stat_perjudicado: 'ataque' },
  { nombre: 'Mild', stat_beneficiado: 'sp_ataque', stat_perjudicado: 'defensa' },
  { nombre: 'Quiet', stat_beneficiado: 'sp_ataque', stat_perjudicado: 'velocidad' },
  { nombre: 'Bashful', stat_beneficiado: 'ninguno', stat_perjudicado: 'ninguno' },
  { nombre: 'Rash', stat_beneficiado: 'sp_ataque', stat_perjudicado: 'sp_defensa' },
  { nombre: 'Calm', stat_beneficiado: 'sp_defensa', stat_perjudicado: 'ataque' },
  { nombre: 'Gentle', stat_beneficiado: 'sp_defensa', stat_perjudicado: 'defensa' },
  { nombre: 'Sassy', stat_beneficiado: 'sp_defensa', stat_perjudicado: 'velocidad' },
  { nombre: 'Careful', stat_beneficiado: 'sp_defensa', stat_perjudicado: 'sp_ataque' },
  { nombre: 'Quirky', stat_beneficiado: 'ninguno', stat_perjudicado: 'ninguno' },
];

@Injectable()
export class NaturalezaService {
  constructor(
    @InjectRepository(Naturaleza)
    private naturalezaRepository: Repository<Naturaleza>,
  ) {}

  async create(createNaturalezaDto: CreateNaturalezaDto): Promise<Naturaleza> {
    const naturaleza = this.naturalezaRepository.create(createNaturalezaDto);
    return this.naturalezaRepository.save(naturaleza);
  }

  async findAll(): Promise<Naturaleza[]> {
    return this.naturalezaRepository.find();
  }

  async findOne(id: number): Promise<Naturaleza> {
    const naturaleza = await this.naturalezaRepository.findOne({ where: { id } });
    if (!naturaleza) {
      throw new NotFoundException('Naturaleza no encontrada');
    }
    return naturaleza;
  }

  async update(id: number, updateNaturalezaDto: UpdateNaturalezaDto): Promise<Naturaleza> {
    const naturaleza = await this.findOne(id);
    Object.assign(naturaleza, updateNaturalezaDto);
    return this.naturalezaRepository.save(naturaleza);
  }

  async remove(id: number): Promise<void> {
    const naturaleza = await this.findOne(id);
    await this.naturalezaRepository.remove(naturaleza);
  }

  async seedNaturalezas(): Promise<{ message: string; count: number }> {
    const existingCount = await this.naturalezaRepository.count();
    
    if (existingCount > 0) {
      return { 
        message: 'Las naturalezas ya están cargadas', 
        count: existingCount 
      };
    }

    const naturalezas = NATURALEZAS_OFICIALES.map(data => 
      this.naturalezaRepository.create(data)
    );

    await this.naturalezaRepository.save(naturalezas);

    return { 
      message: '25 naturalezas oficiales cargadas exitosamente', 
      count: naturalezas.length 
    };
  }
}
