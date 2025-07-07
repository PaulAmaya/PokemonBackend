import { IsNotEmpty, IsString, IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class CreatePokemonHabilidadDto {
  @IsNotEmpty()
  @IsString()
  habilidad: string;

  @IsOptional()
  @IsBoolean()
  es_oculta?: boolean;

  @IsNotEmpty()
  @IsNumber()
  pokemonId: number;
}
