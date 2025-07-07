import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePokemonEnEquipoDto {
  @IsNotEmpty()
  @IsNumber()
  equipoId: number;

  @IsNotEmpty()
  @IsNumber()
  pokemonId: number;

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
