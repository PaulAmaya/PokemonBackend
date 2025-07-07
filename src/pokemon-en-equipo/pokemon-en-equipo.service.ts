import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePokemonEnEquipoDto } from './dto/create-pokemon-en-equipo.dto';
import { UpdatePokemonEnEquipoDto } from './dto/update-pokemon-en-equipo.dto';
import { UpdatePokemonStatsDto } from './dto/update-pokemon-stats.dto';
import { PokemonStatsCalculatorService, FinalStats } from './pokemon-stats-calculator.service';
import { PokemonEnEquipo } from './entities/pokemon-en-equipo.entity';
import { Equipo } from '../equipo/entities/equipo.entity';
import { Pokemon } from '../pokemon/entities/pokemon.entity';
import { Item } from '../item/entities/item.entity';
import { PokemonHabilidad } from '../pokemon-habilidad/entities/pokemon-habilidad.entity';
import { Naturaleza } from '../naturaleza/entities/naturaleza.entity';
import { EV } from '../ev/entities/ev.entity';
import { IV } from '../iv/entities/iv.entity';
import { MovimientoSeleccionado } from '../movimiento-seleccionado/entities/movimiento-seleccionado.entity';
import { Movimiento } from '../movimiento/entities/movimiento.entity';

@Injectable()
export class PokemonEnEquipoService {
  constructor(
    @InjectRepository(PokemonEnEquipo)
    private pokemonEnEquipoRepository: Repository<PokemonEnEquipo>,
    @InjectRepository(Equipo)
    private equipoRepository: Repository<Equipo>,
    @InjectRepository(Pokemon)
    private pokemonRepository: Repository<Pokemon>,
    @InjectRepository(Item)
    private itemRepository: Repository<Item>,
    @InjectRepository(PokemonHabilidad)
    private pokemonHabilidadRepository: Repository<PokemonHabilidad>,
    @InjectRepository(Naturaleza)
    private naturalezaRepository: Repository<Naturaleza>,
    @InjectRepository(EV)
    private evRepository: Repository<EV>,
    @InjectRepository(IV)
    private ivRepository: Repository<IV>,
    @InjectRepository(MovimientoSeleccionado)
    private movimientoSeleccionadoRepository: Repository<MovimientoSeleccionado>,
    @InjectRepository(Movimiento)
    private movimientoRepository: Repository<Movimiento>,
    private pokemonStatsCalculatorService: PokemonStatsCalculatorService,
  ) {}

  async create(createPokemonEnEquipoDto: CreatePokemonEnEquipoDto): Promise<PokemonEnEquipo> {
    const { equipoId, pokemonId, itemId, habilidadId, naturalezaId, ...rest } = createPokemonEnEquipoDto;

    // Verificar que el equipo existe
    const equipo = await this.equipoRepository.findOne({ where: { id: equipoId } });
    if (!equipo) {
      throw new NotFoundException('Equipo no encontrado');
    }

    // Verificar que el Pokémon existe
    const pokemon = await this.pokemonRepository.findOne({ where: { id: pokemonId } });
    if (!pokemon) {
      throw new NotFoundException('Pokémon no encontrado');
    }

    // Crear el Pokémon en equipo
    const pokemonEnEquipo = this.pokemonEnEquipoRepository.create({
      equipo: { id: equipoId },
      pokemon: { id: pokemonId },
      ...rest,
    });

    // Agregar relaciones opcionales
    if (itemId) {
      const item = await this.itemRepository.findOne({ where: { id: itemId } });
      if (item) pokemonEnEquipo.item = item;
    }

    if (habilidadId) {
      const habilidad = await this.pokemonHabilidadRepository.findOne({ where: { id: habilidadId } });
      if (habilidad) pokemonEnEquipo.habilidad = habilidad;
    }

    if (naturalezaId) {
      const naturaleza = await this.naturalezaRepository.findOne({ where: { id: naturalezaId } });
      if (naturaleza) pokemonEnEquipo.naturaleza = naturaleza;
    }

    return this.pokemonEnEquipoRepository.save(pokemonEnEquipo);
  }

  async findAll(): Promise<PokemonEnEquipo[]> {
    return this.pokemonEnEquipoRepository.find({
      relations: [
        'equipo',
        'pokemon',
        'item',
        'habilidad',
        'naturaleza',
        'evs',
        'ivs',
        'movimientos',
        'movimientos.movimiento'
      ],
    });
  }

  async findOne(id: number): Promise<PokemonEnEquipo> {
    const pokemonEnEquipo = await this.pokemonEnEquipoRepository.findOne({
      where: { id },
      relations: [
        'equipo',
        'pokemon',
        'item',
        'habilidad',
        'naturaleza',
        'evs',
        'ivs',
        'movimientos',
        'movimientos.movimiento'
      ],
    });

    if (!pokemonEnEquipo) {
      throw new NotFoundException(`PokemonEnEquipo con ID ${id} no encontrado`);
    }

    return pokemonEnEquipo;
  }

  async update(id: number, updatePokemonEnEquipoDto: UpdatePokemonEnEquipoDto): Promise<PokemonEnEquipo> {
    const pokemonEnEquipo = await this.findOne(id);
    const { itemId, habilidadId, naturalezaId, ...rest } = updatePokemonEnEquipoDto;

    // Actualizar campos básicos
    Object.assign(pokemonEnEquipo, rest);

    // Actualizar relaciones opcionales
    if (itemId !== undefined) {
      if (itemId === null) {
        pokemonEnEquipo.item = undefined;
      } else {
        const item = await this.itemRepository.findOne({ where: { id: itemId } });
        if (!item) throw new NotFoundException('Item no encontrado');
        pokemonEnEquipo.item = item;
      }
    }

    if (habilidadId !== undefined) {
      if (habilidadId === null) {
        pokemonEnEquipo.habilidad = undefined;
      } else {
        const habilidad = await this.pokemonHabilidadRepository.findOne({ where: { id: habilidadId } });
        if (!habilidad) throw new NotFoundException('Habilidad no encontrada');
        pokemonEnEquipo.habilidad = habilidad;
      }
    }

    if (naturalezaId !== undefined) {
      if (naturalezaId === null) {
        pokemonEnEquipo.naturaleza = undefined;
      } else {
        const naturaleza = await this.naturalezaRepository.findOne({ where: { id: naturalezaId } });
        if (!naturaleza) throw new NotFoundException('Naturaleza no encontrada');
        pokemonEnEquipo.naturaleza = naturaleza;
      }
    }

    return this.pokemonEnEquipoRepository.save(pokemonEnEquipo);
  }

  async updateStats(id: number, updateStatsDto: UpdatePokemonStatsDto): Promise<PokemonEnEquipo> {
    const pokemonEnEquipo = await this.findOne(id);
    
    // Actualizar datos básicos
    if (updateStatsDto.apodo !== undefined) pokemonEnEquipo.apodo = updateStatsDto.apodo;
    
    // Actualizar item
    if (updateStatsDto.itemId !== undefined) {
      if (updateStatsDto.itemId === null) {
        pokemonEnEquipo.item = undefined;
      } else {
        const item = await this.itemRepository.findOne({ where: { id: updateStatsDto.itemId } });
        if (!item) throw new NotFoundException('Item no encontrado');
        pokemonEnEquipo.item = item;
      }
    }

    // Actualizar habilidad
    if (updateStatsDto.habilidadId !== undefined) {
      if (updateStatsDto.habilidadId === null) {
        pokemonEnEquipo.habilidad = undefined;
      } else {
        const habilidad = await this.pokemonHabilidadRepository.findOne({ where: { id: updateStatsDto.habilidadId } });
        if (!habilidad) throw new NotFoundException('Habilidad no encontrada');
        pokemonEnEquipo.habilidad = habilidad;
      }
    }

    // Actualizar naturaleza
    if (updateStatsDto.naturalezaId !== undefined) {
      if (updateStatsDto.naturalezaId === null) {
        pokemonEnEquipo.naturaleza = undefined;
      } else {
        const naturaleza = await this.naturalezaRepository.findOne({ where: { id: updateStatsDto.naturalezaId } });
        if (!naturaleza) throw new NotFoundException('Naturaleza no encontrada');
        pokemonEnEquipo.naturaleza = naturaleza;
      }
    }

    // Actualizar EVs
    if (this.hasEvUpdates(updateStatsDto)) {
      await this.updateEvs(pokemonEnEquipo, updateStatsDto);
    }

    // Actualizar IVs
    if (this.hasIvUpdates(updateStatsDto)) {
      await this.updateIvs(pokemonEnEquipo, updateStatsDto);
    }

    // Actualizar movimientos
    if (updateStatsDto.movimientoIds) {
      await this.updateMovimientos(pokemonEnEquipo, updateStatsDto.movimientoIds);
    }

    await this.pokemonEnEquipoRepository.save(pokemonEnEquipo);
    return this.findOne(id);
  }

  private hasEvUpdates(dto: UpdatePokemonStatsDto): boolean {
    return dto.ev_hp !== undefined || dto.ev_ataque !== undefined || 
           dto.ev_defensa !== undefined || dto.ev_sp_ataque !== undefined ||
           dto.ev_sp_defensa !== undefined || dto.ev_velocidad !== undefined;
  }

  private hasIvUpdates(dto: UpdatePokemonStatsDto): boolean {
    return dto.iv_hp !== undefined || dto.iv_ataque !== undefined || 
           dto.iv_defensa !== undefined || dto.iv_sp_ataque !== undefined ||
           dto.iv_sp_defensa !== undefined || dto.iv_velocidad !== undefined;
  }

  private async updateEvs(pokemonEnEquipo: PokemonEnEquipo, dto: UpdatePokemonStatsDto): Promise<void> {
    let evs = pokemonEnEquipo.evs;
    
    if (!evs) {
      evs = this.evRepository.create({
        hp: 0, ataque: 0, defensa: 0, sp_ataque: 0, sp_defensa: 0, velocidad: 0,
        pokemonEnEquipo: pokemonEnEquipo
      });
    }

    if (dto.ev_hp !== undefined) evs.hp = dto.ev_hp;
    if (dto.ev_ataque !== undefined) evs.ataque = dto.ev_ataque;
    if (dto.ev_defensa !== undefined) evs.defensa = dto.ev_defensa;
    if (dto.ev_sp_ataque !== undefined) evs.sp_ataque = dto.ev_sp_ataque;
    if (dto.ev_sp_defensa !== undefined) evs.sp_defensa = dto.ev_sp_defensa;
    if (dto.ev_velocidad !== undefined) evs.velocidad = dto.ev_velocidad;

    // Validar que el total no exceda 510
    const total = evs.hp + evs.ataque + evs.defensa + evs.sp_ataque + evs.sp_defensa + evs.velocidad;
    if (total > 510) {
      throw new BadRequestException(`El total de EVs no puede exceder 510. Total actual: ${total}`);
    }

    await this.evRepository.save(evs);
    pokemonEnEquipo.evs = evs;
  }

  private async updateIvs(pokemonEnEquipo: PokemonEnEquipo, dto: UpdatePokemonStatsDto): Promise<void> {
    let ivs = pokemonEnEquipo.ivs;
    
    if (!ivs) {
      ivs = this.ivRepository.create({
        hp: 31, ataque: 31, defensa: 31, sp_ataque: 31, sp_defensa: 31, velocidad: 31,
        pokemonEnEquipo: pokemonEnEquipo
      });
    }

    if (dto.iv_hp !== undefined) ivs.hp = dto.iv_hp;
    if (dto.iv_ataque !== undefined) ivs.ataque = dto.iv_ataque;
    if (dto.iv_defensa !== undefined) ivs.defensa = dto.iv_defensa;
    if (dto.iv_sp_ataque !== undefined) ivs.sp_ataque = dto.iv_sp_ataque;
    if (dto.iv_sp_defensa !== undefined) ivs.sp_defensa = dto.iv_sp_defensa;
    if (dto.iv_velocidad !== undefined) ivs.velocidad = dto.iv_velocidad;

    await this.ivRepository.save(ivs);
    pokemonEnEquipo.ivs = ivs;
  }

  private async updateMovimientos(pokemonEnEquipo: PokemonEnEquipo, movimientoIds: number[]): Promise<void> {
    if (movimientoIds.length > 4) {
      throw new BadRequestException('Un Pokémon no puede tener más de 4 movimientos');
    }

    // Eliminar movimientos existentes
    await this.movimientoSeleccionadoRepository.delete({ pokemonEnEquipo: { id: pokemonEnEquipo.id } });

    // Agregar nuevos movimientos
    for (const movimientoId of movimientoIds) {
      const movimiento = await this.movimientoRepository.findOne({ where: { id: movimientoId } });
      if (!movimiento) {
        throw new NotFoundException(`Movimiento con ID ${movimientoId} no encontrado`);
      }

      const movimientoSeleccionado = this.movimientoSeleccionadoRepository.create({
        pokemonEnEquipo: pokemonEnEquipo,
        movimiento: movimiento,
      });

      await this.movimientoSeleccionadoRepository.save(movimientoSeleccionado);
    }
  }

  async remove(id: number): Promise<{ message: string }> {
    const pokemonEnEquipo = await this.findOne(id);
    await this.pokemonEnEquipoRepository.remove(pokemonEnEquipo);
    return { message: `Pokémon eliminado del equipo exitosamente` };
  }

  async calculateFinalStats(id: number): Promise<{ pokemonEnEquipo: PokemonEnEquipo; finalStats: FinalStats }> {
    const pokemonEnEquipo = await this.findOne(id);

    if (!pokemonEnEquipo.evs || !pokemonEnEquipo.ivs) {
      throw new BadRequestException('El Pokémon debe tener EVs e IVs configurados para calcular stats finales');
    }

    const finalStats = this.pokemonStatsCalculatorService.calculateAllStats(
      pokemonEnEquipo.pokemon,
      pokemonEnEquipo.evs,
      pokemonEnEquipo.ivs,
      pokemonEnEquipo.naturaleza
    );

    return {
      pokemonEnEquipo,
      finalStats
    };
  }
}
