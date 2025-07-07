import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entities/item.entity';
import { FileUploadService } from '../common/services/file-upload.service';
import { UploadedFile } from 'express-fileupload';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
    private readonly fileUploadService: FileUploadService,
  ) {}

  async create(createItemDto: CreateItemDto): Promise<Item> {
    // Verificar que no exista un item con el mismo nombre
    const existingItem = await this.itemRepository.findOne({
      where: { nombre: createItemDto.nombre }
    });

    if (existingItem) {
      throw new BadRequestException(`Ya existe un item con el nombre '${createItemDto.nombre}'`);
    }

    const nuevoItem = this.itemRepository.create(createItemDto);
    return this.itemRepository.save(nuevoItem);
  }

  async findAll(): Promise<Item[]> {
    return this.itemRepository.find();
  }

  async findOne(id: number): Promise<Item> {
    const item = await this.itemRepository.findOne({
      where: { id }
    });

    if (!item) {
      throw new NotFoundException(`Item con id ${id} no encontrado`);
    }

    return item;
  }

  async findByName(nombre: string): Promise<Item[]> {
    return this.itemRepository.find({
      where: { nombre: Like(`%${nombre}%`) }
    });
  }

  async update(id: number, updateItemDto: UpdateItemDto): Promise<Item> {
    const item = await this.findOne(id);

    // Si se está actualizando el nombre, verificar que no exista otro con ese nombre
    if (updateItemDto.nombre && updateItemDto.nombre !== item.nombre) {
      const existingItem = await this.itemRepository.findOne({
        where: { nombre: updateItemDto.nombre }
      });

      if (existingItem) {
        throw new BadRequestException(`Ya existe un item con el nombre '${updateItemDto.nombre}'`);
      }
    }

    await this.itemRepository.update(id, updateItemDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<{ message: string }> {
    const item = await this.findOne(id);
    await this.itemRepository.delete(id);
    
    return {
      message: `Item '${item.nombre}' eliminado exitosamente`
    };
  }

  async getStats(): Promise<{ total: number, withImages: number, withoutImages: number }> {
    const total = await this.itemRepository.count();
    
    const withImages = await this.itemRepository
      .createQueryBuilder('item')
      .where('item.imagen_url IS NOT NULL')
      .getCount();

    const withoutImages = total - withImages;

    return { total, withImages, withoutImages };
  }

  async getItemsWithImages(): Promise<Item[]> {
    return this.itemRepository
      .createQueryBuilder('item')
      .where('item.imagen_url IS NOT NULL')
      .getMany();
  }

  async getItemsWithoutImages(): Promise<Item[]> {
    return this.itemRepository
      .createQueryBuilder('item')
      .where('item.imagen_url IS NULL')
      .getMany();
  }

  async updateImage(id: number, imagen_url: string): Promise<Item> {
    const item = await this.findOne(id);
    await this.itemRepository.update(id, { imagen_url });
    return this.findOne(id);
  }

  async deleteImage(id: number): Promise<Item> {
    const item = await this.findOne(id);
    await this.itemRepository.update(id, { imagen_url: undefined });
    return this.findOne(id);
  }

  async uploadImage(id: number, file: UploadedFile): Promise<Item> {
    const item = await this.findOne(id);

    // Si ya tiene una imagen, eliminar la anterior
    if (item.imagen_url) {
      await this.fileUploadService.deleteItemImage(item.imagen_url);
    }

    // Subir nueva imagen
    const imagen_url = await this.fileUploadService.uploadItemImage(file, id);

    // Actualizar la URL en la base de datos
    await this.itemRepository.update(id, { imagen_url });

    return this.findOne(id);
  }

  async updateImageUrl(id: number, imagen_url: string): Promise<Item> {
    const item = await this.findOne(id);

    // Si ya tiene una imagen subida (no URL), eliminar el archivo
    if (item.imagen_url && item.imagen_url.startsWith('/uploads/')) {
      await this.fileUploadService.deleteItemImage(item.imagen_url);
    }

    await this.itemRepository.update(id, { imagen_url });
    return this.findOne(id);
  }

  async removeImage(id: number): Promise<Item> {
    const item = await this.findOne(id);

    // Si tiene una imagen subida, eliminar el archivo
    if (item.imagen_url && item.imagen_url.startsWith('/uploads/')) {
      await this.fileUploadService.deleteItemImage(item.imagen_url);
    }

    await this.itemRepository.update(id, { imagen_url: undefined });
    return this.findOne(id);
  }
}
