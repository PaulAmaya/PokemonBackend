import { Injectable, BadRequestException } from '@nestjs/common';
import { UploadedFile } from 'express-fileupload';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class FileUploadService {
  private readonly uploadPaths = {
    pokemon: './uploads/pokemon/',
    movimiento: './uploads/movimientos/',
    item: './uploads/items/'
  };

  async uploadPokemonImage(file: UploadedFile, pokemonId: number): Promise<string> {
    return this.uploadImage(file, 'pokemon', pokemonId);
  }

  async uploadMovimientoImage(file: UploadedFile, movimientoId: number): Promise<string> {
    return this.uploadImage(file, 'movimiento', movimientoId);
  }

  async uploadItemImage(file: UploadedFile, itemId: number): Promise<string> {
    return this.uploadImage(file, 'item', itemId);
  }

  private async uploadImage(file: UploadedFile, type: string, entityId: number): Promise<string> {
    // Validar tipo de archivo
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.mimetype)) {
      throw new BadRequestException('Solo se permiten archivos de imagen (JPEG, PNG, GIF, WebP)');
    }

    // Validar tamaño (máximo 5MB)
    if (file.size > 5 * 1024 * 1024) {
      throw new BadRequestException('El archivo es demasiado grande. Máximo 5MB');
    }

    const uploadPath = this.uploadPaths[type];
    if (!uploadPath) {
      throw new BadRequestException('Tipo de entidad no válido');
    }

    // Generar nombre único para el archivo
    const fileExtension = path.extname(file.name);
    const fileName = `${type}_${entityId}_${Date.now()}${fileExtension}`;
    const filePath = path.join(uploadPath, fileName);

    try {
      // Crear directorio si no existe
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }

      // Mover el archivo a la carpeta de destino
      await file.mv(filePath);

      // Retornar la URL relativa que se guardará en la base de datos
      return `/uploads/${type === 'movimiento' ? 'movimientos' : type === 'item' ? 'items' : 'pokemon'}/${fileName}`;
    } catch (error) {
      throw new BadRequestException('Error al guardar el archivo: ' + error.message);
    }
  }

  async deletePokemonImage(imagePath: string): Promise<void> {
    return this.deleteImage(imagePath, 'pokemon');
  }

  async deleteMovimientoImage(imagePath: string): Promise<void> {
    return this.deleteImage(imagePath, 'movimiento');
  }

  async deleteItemImage(imagePath: string): Promise<void> {
    return this.deleteImage(imagePath, 'item');
  }

  private async deleteImage(imagePath: string, type: string): Promise<void> {
    if (!imagePath) return;

    const uploadPath = this.uploadPaths[type];
    if (!uploadPath) return;

    // Construir la ruta completa del archivo
    const fileName = path.basename(imagePath);
    const fullPath = path.join(uploadPath, fileName);

    try {
      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
      }
    } catch (error) {
      console.error('Error al eliminar archivo:', error);
      // No lanzar error para no interrumpir la eliminación de la entidad
    }
  }

  getImageUrl(imagePath: string, baseUrl: string): string | null {
    if (!imagePath) return null;
    return `${baseUrl}${imagePath}`;
  }
}
