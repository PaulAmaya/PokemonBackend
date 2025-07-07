import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, Req, BadRequestException } from '@nestjs/common';
import { MovimientoService } from './movimiento.service';
import { CreateMovimientoDto } from './dto/create-movimiento.dto';
import { UpdateMovimientoDto } from './dto/update-movimiento.dto';
import { UpdateMovimientoImageDto } from './dto/update-movimiento-image.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AdminGuard } from '../auth/admin.guard';
import { Request } from 'express';
import { validateId } from '../common/utils/validate-id.util';

interface RequestWithFiles extends Request {
  files?: any;
}

@Controller('movimiento')
export class MovimientoController {
  constructor(private readonly movimientoService: MovimientoService) {}

  @Post()
  @UseGuards(JwtAuthGuard, AdminGuard)
  create(@Body() createMovimientoDto: CreateMovimientoDto) {
    return this.movimientoService.create(createMovimientoDto);
  }

  @Get()
  findAll() {
    return this.movimientoService.findAll();
  }

  @Get('search/name')
  findByName(@Query('name') name: string) {
    return this.movimientoService.findByName(name);
  }

  @Get('search/type')
  findByType(@Query('type') type: string) {
    return this.movimientoService.findByType(type);
  }

  @Get('search/category')
  findByCategory(@Query('category') category: string) {
    return this.movimientoService.findByCategory(category);
  }

  @Get('stats')
  getStats() {
    return this.movimientoService.getStats();
  }

  @Get('with-images')
  getMovimientosWithImages() {
    return this.movimientoService.getMovimientosWithImages();
  }

  @Get('without-images')
  getMovimientosWithoutImages() {
    return this.movimientoService.getMovimientosWithoutImages();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const movimientoId = validateId(id, 'ID de movimiento');
    return this.movimientoService.findOne(movimientoId);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  update(@Param('id') id: string, @Body() updateMovimientoDto: UpdateMovimientoDto) {
    const movimientoId = validateId(id, 'ID de movimiento');
    return this.movimientoService.update(movimientoId, updateMovimientoDto);
  }

  @Patch(':id/imagen')
  @UseGuards(JwtAuthGuard, AdminGuard)
  updateImage(@Param('id') id: string, @Body() updateImageDto: UpdateMovimientoImageDto) {
    const movimientoId = validateId(id, 'ID de movimiento');
    return this.movimientoService.updateImageUrl(movimientoId, updateImageDto.imagen_url);
  }

  @Delete(':id/imagen')
  @UseGuards(JwtAuthGuard, AdminGuard)
  removeImage(@Param('id') id: string) {
    const movimientoId = validateId(id, 'ID de movimiento');
    return this.movimientoService.removeImage(movimientoId);
  }

  @Post(':id/upload-image')
  @UseGuards(JwtAuthGuard, AdminGuard)
  async uploadImage(@Param('id') id: string, @Req() req: RequestWithFiles) {
    if (!req.files || !req.files.imagen) {
      throw new BadRequestException('No se ha enviado ningún archivo. El campo debe llamarse "imagen"');
    }

    const movimientoId = validateId(id, 'ID de movimiento');
    const file = req.files.imagen;
    return this.movimientoService.uploadImage(movimientoId, file);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  remove(@Param('id') id: string) {
    const movimientoId = validateId(id, 'ID de movimiento');
    return this.movimientoService.remove(movimientoId);
  }
}
