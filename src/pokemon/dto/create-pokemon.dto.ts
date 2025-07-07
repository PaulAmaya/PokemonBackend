import { IsNotEmpty, IsString, IsNumber, IsOptional, IsUrl, Min, Max } from 'class-validator';

export class CreatePokemonDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsString()
  tipo1: string;

  @IsOptional()
  @IsString()
  tipo2?: string;

  @IsOptional()
  @IsString()
  imagen_url?: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(255)
  base_hp: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(255)
  base_ataque: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(255)
  base_defensa: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(255)
  base_sp_ataque: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(255)
  base_sp_defensa: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(255)
  base_velocidad: number;
}
