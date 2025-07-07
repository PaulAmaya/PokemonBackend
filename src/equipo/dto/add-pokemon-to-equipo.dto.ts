import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class AddPokemonToEquipoDto {
  @IsNotEmpty()
  @IsNumber()
  pokemonId: number;

  @IsOptional()
  @IsString()
  apodo?: string;
}
