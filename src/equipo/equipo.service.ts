import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEquipoDto } from './dto/create-equipo.dto';
import { UpdateEquipoDto } from './dto/update-equipo.dto';
import { AddPokemonToEquipoDto } from './dto/add-pokemon-to-equipo.dto';
import { Equipo } from './entities/equipo.entity';
import { Usuario } from '../usuario/entities/usuario.entity';
import { Pokemon } from '../pokemon/entities/pokemon.entity';
import { PokemonEnEquipo } from '../pokemon-en-equipo/entities/pokemon-en-equipo.entity';

@Injectable()
export class EquipoService {
  constructor(
    @InjectRepository(Equipo)
    private equipoRepository: Repository<Equipo>,
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
    @InjectRepository(Pokemon)
    private pokemonRepository: Repository<Pokemon>,
    @InjectRepository(PokemonEnEquipo)
    private pokemonEnEquipoRepository: Repository<PokemonEnEquipo>,
  ) {}

  async create(createEquipoDto: CreateEquipoDto, userId: number): Promise<Equipo> {
    // Verificar que el usuario existe
    const usuario = await this.usuarioRepository.findOne({ where: { id: userId } });
    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
    }

    // Crear el equipo
    const equipo = this.equipoRepository.create({
      nombre: createEquipoDto.nombre,
      usuario: usuario,
    });

    const savedEquipo = await this.equipoRepository.save(equipo);

    // Si se proporcionaron IDs de Pokémon, agregarlos al equipo
    if (createEquipoDto.pokemonIds && createEquipoDto.pokemonIds.length > 0) {
      await this.addPokemonsToEquipo(savedEquipo.id, createEquipoDto.pokemonIds);
    }

    return this.findOne(savedEquipo.id);
  }

  async findAll(): Promise<Equipo[]> {
    return this.equipoRepository.find({
      relations: [
        'usuario', 
        'pokemones', 
        'pokemones.pokemon'
      ],
    });
  }

  async findAllDetailed(): Promise<Equipo[]> {
    return this.equipoRepository.find({
      relations: [
        'usuario', 
        'pokemones', 
        'pokemones.pokemon',
        'pokemones.pokemon.habilidades',
        'pokemones.pokemon.movimientos',
        'pokemones.item',
        'pokemones.habilidad',
        'pokemones.naturaleza',
        'pokemones.evs',
        'pokemones.ivs',
        'pokemones.movimientos',
        'pokemones.movimientos.movimiento'
      ],
    });
  }

  async findByUser(userId: number): Promise<Equipo[]> {
    return this.equipoRepository.find({
      where: { usuario: { id: userId } },
      relations: [
        'usuario', 
        'pokemones', 
        'pokemones.pokemon',
        'pokemones.pokemon.habilidades',
        'pokemones.pokemon.movimientos',
        'pokemones.item',
        'pokemones.habilidad',
        'pokemones.naturaleza',
        'pokemones.evs',
        'pokemones.ivs',
        'pokemones.movimientos',
        'pokemones.movimientos.movimiento'
      ],
    });
  }

  async findOne(id: number): Promise<Equipo> {
    const equipo = await this.equipoRepository.findOne({
      where: { id },
      relations: [
        'usuario', 
        'pokemones', 
        'pokemones.pokemon',
        'pokemones.pokemon.habilidades',
        'pokemones.pokemon.movimientos',
        'pokemones.item',
        'pokemones.habilidad',
        'pokemones.naturaleza',
        'pokemones.evs',
        'pokemones.ivs',
        'pokemones.movimientos',
        'pokemones.movimientos.movimiento'
      ],
    });

    if (!equipo) {
      throw new NotFoundException(`Equipo con ID ${id} no encontrado`);
    }

    return equipo;
  }

  async update(id: number, updateEquipoDto: UpdateEquipoDto): Promise<Equipo> {
    const equipo = await this.findOne(id);
    
    if (updateEquipoDto.nombre) {
      equipo.nombre = updateEquipoDto.nombre;
    }

    await this.equipoRepository.save(equipo);
    return this.findOne(id);
  }

  async remove(id: number): Promise<{ message: string }> {
    const equipo = await this.findOne(id);
    
    // Eliminar todos los Pokémon del equipo primero
    await this.pokemonEnEquipoRepository.delete({ equipo: { id } });
    
    // Eliminar el equipo
    await this.equipoRepository.remove(equipo);
    
    return { message: `Equipo '${equipo.nombre}' eliminado exitosamente` };
  }

  async addPokemonToEquipo(equipoId: number, addPokemonDto: AddPokemonToEquipoDto): Promise<Equipo> {
    const equipo = await this.findOne(equipoId);
    
    // Verificar que el equipo no tenga más de 6 Pokémon
    if (equipo.pokemones.length >= 6) {
      throw new BadRequestException('El equipo ya tiene el máximo de 6 Pokémon');
    }

    // Verificar que el Pokémon existe
    const pokemon = await this.pokemonRepository.findOne({ where: { id: addPokemonDto.pokemonId } });
    if (!pokemon) {
      throw new NotFoundException(`Pokémon con ID ${addPokemonDto.pokemonId} no encontrado`);
    }

    // Verificar que el Pokémon no esté ya en el equipo
    const pokemonExistente = equipo.pokemones.find(pe => pe.pokemon.id === addPokemonDto.pokemonId);
    if (pokemonExistente) {
      throw new BadRequestException(`El Pokémon ${pokemon.nombre} ya está en el equipo`);
    }

    // Agregar el Pokémon al equipo
    const pokemonEnEquipo = this.pokemonEnEquipoRepository.create({
      equipo: { id: equipo.id },
      pokemon: { id: pokemon.id },
      apodo: addPokemonDto.apodo,
    });

    await this.pokemonEnEquipoRepository.save(pokemonEnEquipo);
    return this.findOne(equipoId);
  }

  async removePokemonFromEquipo(equipoId: number, pokemonId: number): Promise<Equipo> {
    // Buscar el equipo con todas las relaciones necesarias
    const equipo = await this.equipoRepository.findOne({
      where: { id: equipoId },
      relations: ['pokemones', 'pokemones.pokemon'],
    });

    if (!equipo) {
      throw new NotFoundException(`Equipo con ID ${equipoId} no encontrado`);
    }

    // Debug: Ver qué Pokémon están en el equipo
    console.log('Pokémon en el equipo:', equipo.pokemones.map(pe => ({
      pokemonEnEquipoId: pe.id,
      pokemonId: pe.pokemon.id,
      pokemonNombre: pe.pokemon.nombre
    })));
    console.log('Buscando Pokémon con ID:', pokemonId);
    
    // Buscar el Pokémon en el equipo por ID del Pokémon
    const pokemonEnEquipo = equipo.pokemones.find(pe => pe.pokemon.id === pokemonId);
    if (!pokemonEnEquipo) {
      throw new NotFoundException(`El Pokémon con ID ${pokemonId} no está en este equipo. Pokémon disponibles: ${equipo.pokemones.map(pe => `${pe.pokemon.nombre} (ID: ${pe.pokemon.id})`).join(', ')}`);
    }

    // Eliminar el Pokémon del equipo
    await this.pokemonEnEquipoRepository.remove(pokemonEnEquipo);
    return this.findOne(equipoId);
  }

  async getEquipoStats(equipoId: number): Promise<any> {
    const equipo = await this.findOne(equipoId);
    
    const stats = {
      nombre: equipo.nombre,
      propietario: equipo.usuario.username,
      totalPokemon: equipo.pokemones.length,
      espaciosLibres: 6 - equipo.pokemones.length,
      pokemones: equipo.pokemones.map(pe => ({
        id: pe.pokemon.id,
        nombre: pe.pokemon.nombre,
        apodo: pe.apodo,
        tipo1: pe.pokemon.tipo1,
        tipo2: pe.pokemon.tipo2,
        imagen_url: pe.pokemon.imagen_url,
        item: pe.item ? {
          id: pe.item.id,
          nombre: pe.item.nombre,
          imagen_url: pe.item.imagen_url
        } : null,
        habilidad: pe.habilidad ? {
          id: pe.habilidad.id,
          nombre: pe.habilidad.habilidad,
          es_oculta: pe.habilidad.es_oculta
        } : null,
        naturaleza: pe.naturaleza ? {
          id: pe.naturaleza.id,
          nombre: pe.naturaleza.nombre
        } : null,
        evs: pe.evs ? {
          hp: pe.evs.hp,
          ataque: pe.evs.ataque,
          defensa: pe.evs.defensa,
          sp_ataque: pe.evs.sp_ataque,
          sp_defensa: pe.evs.sp_defensa,
          velocidad: pe.evs.velocidad
        } : null,
        ivs: pe.ivs ? {
          hp: pe.ivs.hp,
          ataque: pe.ivs.ataque,
          defensa: pe.ivs.defensa,
          sp_ataque: pe.ivs.sp_ataque,
          sp_defensa: pe.ivs.sp_defensa,
          velocidad: pe.ivs.velocidad
        } : null,
        movimientos: pe.movimientos ? pe.movimientos.map(mov => ({
          id: mov.movimiento.id,
          nombre: mov.movimiento.nombre,
          tipo: mov.movimiento.tipo,
          categoria: mov.movimiento.categoria,
          poder: mov.movimiento.poder
        })) : []
      })),
    };

    return stats;
  }

  private async addPokemonsToEquipo(equipoId: number, pokemonIds: number[]): Promise<void> {
    const equipo = await this.equipoRepository.findOne({ where: { id: equipoId } });
    if (!equipo) {
      throw new NotFoundException('Equipo no encontrado');
    }
    
    for (const pokemonId of pokemonIds) {
      const pokemon = await this.pokemonRepository.findOne({ where: { id: pokemonId } });
      if (pokemon) {
        const pokemonEnEquipo = this.pokemonEnEquipoRepository.create({
          equipo: { id: equipo.id },
          pokemon: { id: pokemon.id },
        });
        await this.pokemonEnEquipoRepository.save(pokemonEnEquipo);
      }
    }
  }
}
