import { IsNotEmpty, IsString, IsNumber, IsOptional, IsIn, Min, Max, IsUrl } from 'class-validator';

export class CreateMovimientoDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsString()
  tipo: string;

  @IsNotEmpty()
  @IsString()
  @IsIn(['físico', 'especial', 'estado'], {
    message: 'La categoría debe ser: físico, especial o estado'
  })
  categoria: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(250)
  poder?: number;

  @IsNotEmpty()
  @IsString()
  descripcion: string;

  @IsOptional()
  @IsString()
  imagen_url?: string;
}
