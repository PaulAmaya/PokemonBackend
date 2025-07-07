import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, Req, BadRequestException } from '@nestjs/common';
import { ItemService } from './item.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { UpdateItemImageDto } from './dto/update-item-image.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AdminGuard } from '../auth/admin.guard';
import { Request } from 'express';
import { validateId } from '../common/utils/validate-id.util';

interface RequestWithFiles extends Request {
  files?: any;
}

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  @UseGuards(JwtAuthGuard, AdminGuard)
  create(@Body() createItemDto: CreateItemDto) {
    return this.itemService.create(createItemDto);
  }

  @Get()
  findAll() {
    return this.itemService.findAll();
  }

  @Get('search/name')
  findByName(@Query('name') name: string) {
    return this.itemService.findByName(name);
  }

  @Get('stats')
  getStats() {
    return this.itemService.getStats();
  }

  @Get('with-images')
  getItemsWithImages() {
    return this.itemService.getItemsWithImages();
  }

  @Get('without-images')
  getItemsWithoutImages() {
    return this.itemService.getItemsWithoutImages();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const itemId = validateId(id, 'ID de item');
    return this.itemService.findOne(itemId);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    const itemId = validateId(id, 'ID de item');
    return this.itemService.update(itemId, updateItemDto);
  }

  @Patch(':id/imagen')
  @UseGuards(JwtAuthGuard, AdminGuard)
  updateImage(@Param('id') id: string, @Body() updateImageDto: UpdateItemImageDto) {
    const itemId = validateId(id, 'ID de item');
    return this.itemService.updateImageUrl(itemId, updateImageDto.imagen_url);
  }

  @Delete(':id/imagen')
  @UseGuards(JwtAuthGuard, AdminGuard)
  removeImage(@Param('id') id: string) {
    const itemId = validateId(id, 'ID de item');
    return this.itemService.removeImage(itemId);
  }

  @Post(':id/upload-image')
  @UseGuards(JwtAuthGuard, AdminGuard)
  async uploadImage(@Param('id') id: string, @Req() req: RequestWithFiles) {
    if (!req.files || !req.files.imagen) {
      throw new BadRequestException('No se ha enviado ningún archivo. El campo debe llamarse "imagen"');
    }

    const itemId = validateId(id, 'ID de item');
    const file = req.files.imagen;
    return this.itemService.uploadImage(itemId, file);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  remove(@Param('id') id: string) {
    const itemId = validateId(id, 'ID de item');
    return this.itemService.remove(itemId);
  }
}
