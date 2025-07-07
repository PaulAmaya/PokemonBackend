import { IsNotEmpty, IsString, IsOptional, IsUrl } from 'class-validator';

export class CreateItemDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsString()
  descripcion: string;

  @IsOptional()
  @IsString()
  imagen_url?: string;
}
