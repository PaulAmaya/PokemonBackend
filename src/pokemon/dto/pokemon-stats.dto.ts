import { IsOptional, IsNumber } from 'class-validator';

export class PokemonStatsDto {
  @IsOptional()
  @IsNumber()
  minHp?: number;

  @IsOptional()
  @IsNumber()
  maxHp?: number;

  @IsOptional()
  @IsNumber()
  minAtaque?: number;

  @IsOptional()
  @IsNumber()
  maxAtaque?: number;

  @IsOptional()
  @IsNumber()
  minDefensa?: number;

  @IsOptional()
  @IsNumber()
  maxDefensa?: number;
}
