import { IsOptional, IsNumber, IsString } from 'class-validator';

export class UpdatePokemonEnEquipoDto {
  @IsOptional()
  @IsString()
  apodo?: string;

  @IsOptional()
  @IsNumber()
  itemId?: number;

  @IsOptional()
  @IsNumber()
  habilidadId?: number;

  @IsOptional()
  @IsNumber()
  naturalezaId?: number;
}
