import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePokemonHabilidadDto } from './dto/create-pokemon-habilidad.dto';
import { UpdatePokemonHabilidadDto } from './dto/update-pokemon-habilidad.dto';
import { PokemonHabilidad } from './entities/pokemon-habilidad.entity';
import { Pokemon } from '../pokemon/entities/pokemon.entity';

@Injectable()
export class PokemonHabilidadService {
  constructor(
    @InjectRepository(PokemonHabilidad)
    private pokemonHabilidadRepository: Repository<PokemonHabilidad>,
    @InjectRepository(Pokemon)
    private pokemonRepository: Repository<Pokemon>,
  ) {}

  async create(createPokemonHabilidadDto: CreatePokemonHabilidadDto): Promise<PokemonHabilidad> {
    const { pokemonId, ...habilidadData } = createPokemonHabilidadDto;

    // Verificar que el Pokémon existe
    const pokemon = await this.pokemonRepository.findOne({ where: { id: pokemonId } });
    if (!pokemon) {
      throw new NotFoundException('Pokémon no encontrado');
    }

    const habilidad = this.pokemonHabilidadRepository.create({
      ...habilidadData,
      pokemon: { id: pokemonId },
    });

    return this.pokemonHabilidadRepository.save(habilidad);
  }

  async findAll(): Promise<PokemonHabilidad[]> {
    return this.pokemonHabilidadRepository.find({
      relations: ['pokemon'],
    });
  }

  async findOne(id: number): Promise<PokemonHabilidad> {
    const habilidad = await this.pokemonHabilidadRepository.findOne({
      where: { id },
      relations: ['pokemon'],
    });

    if (!habilidad) {
      throw new NotFoundException('Habilidad no encontrada');
    }

    return habilidad;
  }

  async update(id: number, updatePokemonHabilidadDto: UpdatePokemonHabilidadDto): Promise<PokemonHabilidad> {
    const habilidad = await this.findOne(id);
    
    if (updatePokemonHabilidadDto.pokemonId) {
      const pokemon = await this.pokemonRepository.findOne({ 
        where: { id: updatePokemonHabilidadDto.pokemonId } 
      });
      if (!pokemon) {
        throw new NotFoundException('Pokémon no encontrado');
      }
      habilidad.pokemon = pokemon;
    }

    Object.assign(habilidad, updatePokemonHabilidadDto);
    return this.pokemonHabilidadRepository.save(habilidad);
  }

  async remove(id: number): Promise<void> {
    const habilidad = await this.findOne(id);
    await this.pokemonHabilidadRepository.remove(habilidad);
  }
}
