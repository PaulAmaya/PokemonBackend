import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { CreateMovimientoDto } from './dto/create-movimiento.dto';
import { UpdateMovimientoDto } from './dto/update-movimiento.dto';
import { Movimiento } from './entities/movimiento.entity';
import { FileUploadService } from '../common/services/file-upload.service';
import { UploadedFile } from 'express-fileupload';

@Injectable()
export class MovimientoService {
  constructor(
    @InjectRepository(Movimiento)
    private readonly movimientoRepository: Repository<Movimiento>,
    private readonly fileUploadService: FileUploadService,
  ) {}

  async create(createMovimientoDto: CreateMovimientoDto): Promise<Movimiento> {
    // Verificar que no exista un movimiento con el mismo nombre
    const existingMovimiento = await this.movimientoRepository.findOne({
      where: { nombre: createMovimientoDto.nombre }
    });

    if (existingMovimiento) {
      throw new BadRequestException(`Ya existe un movimiento con el nombre '${createMovimientoDto.nombre}'`);
    }

    const nuevoMovimiento = this.movimientoRepository.create(createMovimientoDto);
    return this.movimientoRepository.save(nuevoMovimiento);
  }

  async findAll(): Promise<Movimiento[]> {
    return this.movimientoRepository.find({
      relations: ['pokemonMovimientos']
    });
  }

  async findOne(id: number): Promise<Movimiento> {
    const movimiento = await this.movimientoRepository.findOne({
      where: { id },
      relations: ['pokemonMovimientos']
    });

    if (!movimiento) {
      throw new NotFoundException(`Movimiento con id ${id} no encontrado`);
    }

    return movimiento;
  }

  async findByName(nombre: string): Promise<Movimiento[]> {
    return this.movimientoRepository.find({
      where: { nombre: Like(`%${nombre}%`) },
      relations: ['pokemonMovimientos']
    });
  }

  async findByType(tipo: string): Promise<Movimiento[]> {
    return this.movimientoRepository.find({
      where: { tipo },
      relations: ['pokemonMovimientos']
    });
  }

  async findByCategory(categoria: string): Promise<Movimiento[]> {
    return this.movimientoRepository.find({
      where: { categoria },
      relations: ['pokemonMovimientos']
    });
  }

  async update(id: number, updateMovimientoDto: UpdateMovimientoDto): Promise<Movimiento> {
    const movimiento = await this.findOne(id);

    // Si se está actualizando el nombre, verificar que no exista otro con ese nombre
    if (updateMovimientoDto.nombre && updateMovimientoDto.nombre !== movimiento.nombre) {
      const existingMovimiento = await this.movimientoRepository.findOne({
        where: { nombre: updateMovimientoDto.nombre }
      });

      if (existingMovimiento) {
        throw new BadRequestException(`Ya existe un movimiento con el nombre '${updateMovimientoDto.nombre}'`);
      }
    }

    await this.movimientoRepository.update(id, updateMovimientoDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<{ message: string }> {
    const movimiento = await this.findOne(id);
    await this.movimientoRepository.delete(id);
    
    return {
      message: `Movimiento '${movimiento.nombre}' eliminado exitosamente`
    };
  }

  async getStats(): Promise<{ total: number, tipos: any[], categorias: any[] }> {
    const total = await this.movimientoRepository.count();
    
    const tipos = await this.movimientoRepository
      .createQueryBuilder('movimiento')
      .select('movimiento.tipo', 'tipo')
      .addSelect('COUNT(*)', 'cantidad')
      .groupBy('movimiento.tipo')
      .getRawMany();

    const categorias = await this.movimientoRepository
      .createQueryBuilder('movimiento')
      .select('movimiento.categoria', 'categoria')
      .addSelect('COUNT(*)', 'cantidad')
      .groupBy('movimiento.categoria')
      .getRawMany();

    return { total, tipos, categorias };
  }

  async uploadImage(id: number, file: UploadedFile): Promise<Movimiento> {
    const movimiento = await this.findOne(id);

    // Si ya tiene una imagen, eliminar la anterior
    if (movimiento.imagen_url) {
      await this.fileUploadService.deleteMovimientoImage(movimiento.imagen_url);
    }

    // Subir nueva imagen
    const imagen_url = await this.fileUploadService.uploadMovimientoImage(file, id);

    // Actualizar la URL en la base de datos
    await this.movimientoRepository.update(id, { imagen_url });

    return this.findOne(id);
  }

  async updateImageUrl(id: number, imagen_url: string): Promise<Movimiento> {
    const movimiento = await this.findOne(id);

    // Si ya tiene una imagen subida (no URL), eliminar el archivo
    if (movimiento.imagen_url && movimiento.imagen_url.startsWith('/uploads/')) {
      await this.fileUploadService.deleteMovimientoImage(movimiento.imagen_url);
    }

    await this.movimientoRepository.update(id, { imagen_url });
    return this.findOne(id);
  }

  async removeImage(id: number): Promise<Movimiento> {
    const movimiento = await this.findOne(id);

    // Si tiene una imagen subida, eliminar el archivo
    if (movimiento.imagen_url && movimiento.imagen_url.startsWith('/uploads/')) {
      await this.fileUploadService.deleteMovimientoImage(movimiento.imagen_url);
    }

    await this.movimientoRepository.update(id, { imagen_url: undefined });
    return this.findOne(id);
  }

  async getMovimientosWithImages(): Promise<Movimiento[]> {
    return this.movimientoRepository
      .createQueryBuilder('movimiento')
      .where('movimiento.imagen_url IS NOT NULL')
      .getMany();
  }

  async getMovimientosWithoutImages(): Promise<Movimiento[]> {
    return this.movimientoRepository
      .createQueryBuilder('movimiento')
      .where('movimiento.imagen_url IS NULL')
      .getMany();
  }
}
