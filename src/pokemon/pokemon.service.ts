import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, IsNull, Not } from 'typeorm';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';
import { FileUploadService } from '../common/services/file-upload.service';
import { UploadedFile } from 'express-fileupload';

@Injectable()
export class PokemonService {
  constructor(
    @InjectRepository(Pokemon)
    private readonly pokemonRepository: Repository<Pokemon>,
    private readonly fileUploadService: FileUploadService,
  ) {}

  async create(createPokemonDto: CreatePokemonDto): Promise<Pokemon> {
    // Verificar que no exista un Pokémon con el mismo nombre
    const existingPokemon = await this.pokemonRepository.findOne({
      where: { nombre: createPokemonDto.nombre }
    });

    if (existingPokemon) {
      throw new BadRequestException(`Ya existe un Pokémon con el nombre '${createPokemonDto.nombre}'`);
    }

    const nuevoPokemon = this.pokemonRepository.create(createPokemonDto);
    return this.pokemonRepository.save(nuevoPokemon);
  }

  async findAll(): Promise<Pokemon[]> {
    return this.pokemonRepository.find({
      relations: ['habilidades', 'movimientos']
    });
  }

  async findOne(id: number): Promise<Pokemon> {
    const pokemon = await this.pokemonRepository.findOne({
      where: { id },
      relations: ['habilidades', 'movimientos']
    });

    if (!pokemon) {
      throw new NotFoundException(`Pokémon con id ${id} no encontrado`);
    }

    return pokemon;
  }

  async findByName(nombre: string): Promise<Pokemon[]> {
    return this.pokemonRepository.find({
      where: { nombre: Like(`%${nombre}%`) },
      relations: ['habilidades', 'movimientos']
    });
  }

  async findByType(tipo: string): Promise<Pokemon[]> {
    return this.pokemonRepository.find({
      where: [
        { tipo1: tipo },
        { tipo2: tipo }
      ],
      relations: ['habilidades', 'movimientos']
    });
  }

  async update(id: number, updatePokemonDto: UpdatePokemonDto): Promise<Pokemon> {
    const pokemon = await this.findOne(id);

    // Si se está actualizando el nombre, verificar que no exista otro con ese nombre
    if (updatePokemonDto.nombre && updatePokemonDto.nombre !== pokemon.nombre) {
      const existingPokemon = await this.pokemonRepository.findOne({
        where: { nombre: updatePokemonDto.nombre }
      });

      if (existingPokemon) {
        throw new BadRequestException(`Ya existe un Pokémon con el nombre '${updatePokemonDto.nombre}'`);
      }
    }

    await this.pokemonRepository.update(id, updatePokemonDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<{ message: string }> {
    const pokemon = await this.findOne(id);
    
    // Eliminar imagen si existe
    if (pokemon.imagen_url) {
      await this.fileUploadService.deletePokemonImage(pokemon.imagen_url);
    }
    
    await this.pokemonRepository.delete(id);
    
    return {
      message: `Pokémon '${pokemon.nombre}' eliminado exitosamente`
    };
  }

  async getStats(): Promise<{ total: number, tipos: any[] }> {
    const total = await this.pokemonRepository.count();
    
    const tipos = await this.pokemonRepository
      .createQueryBuilder('pokemon')
      .select('pokemon.tipo1', 'tipo')
      .addSelect('COUNT(*)', 'cantidad')
      .groupBy('pokemon.tipo1')
      .getRawMany();

    return { total, tipos };
  }

  async updateImage(id: number, imagen_url: string): Promise<Pokemon> {
    const pokemon = await this.findOne(id);
    
    pokemon.imagen_url = imagen_url;
    await this.pokemonRepository.save(pokemon);
    
    return this.findOne(id);
  }

  async removeImage(id: number): Promise<Pokemon> {
    const pokemon = await this.findOne(id);
    
    pokemon.imagen_url = null;
    await this.pokemonRepository.save(pokemon);
    
    return this.findOne(id);
  }

  async findPokemonWithoutImage(): Promise<Pokemon[]> {
    return this.pokemonRepository.find({
      where: { imagen_url: IsNull() },
      relations: ['habilidades', 'movimientos']
    });
  }

  async findPokemonWithImage(): Promise<Pokemon[]> {
    return this.pokemonRepository.find({
      where: { imagen_url: Not(IsNull()) },
      relations: ['habilidades', 'movimientos']
    });
  }

  async uploadImage(id: number, file: UploadedFile): Promise<Pokemon> {
    const pokemon = await this.findOne(id);
    
    // Si ya tiene imagen, eliminar la anterior
    if (pokemon.imagen_url) {
      await this.fileUploadService.deletePokemonImage(pokemon.imagen_url);
    }
    
    // Subir nueva imagen
    const imagePath = await this.fileUploadService.uploadPokemonImage(file, id);
    
    // Actualizar la base de datos
    pokemon.imagen_url = imagePath;
    await this.pokemonRepository.save(pokemon);
    
    return this.findOne(id);
  }
}
