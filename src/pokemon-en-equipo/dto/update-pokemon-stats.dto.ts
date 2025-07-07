import { IsNotEmpty, IsNumber, IsOptional, IsString, Min, Max } from 'class-validator';

export class UpdatePokemonStatsDto {
  @IsOptional()
  @IsString()
  apodo?: string;

  @IsOptional()
  @IsNumber()
  itemId?: number | null;

  @IsOptional()
  @IsNumber()
  habilidadId?: number | null;

  @IsOptional()
  @IsNumber()
  naturalezaId?: number | null;

  // EVs (0-252 cada stat, máximo 510 total)
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(252)
  ev_hp?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(252)
  ev_ataque?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(252)
  ev_defensa?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(252)
  ev_sp_ataque?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(252)
  ev_sp_defensa?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(252)
  ev_velocidad?: number;

  // IVs (0-31 cada stat)
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(31)
  iv_hp?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(31)
  iv_ataque?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(31)
  iv_defensa?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(31)
  iv_sp_ataque?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(31)
  iv_sp_defensa?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(31)
  iv_velocidad?: number;

  // Movimientos (array de IDs)
  @IsOptional()
  @IsNumber({}, { each: true })
  movimientoIds?: number[];
}
