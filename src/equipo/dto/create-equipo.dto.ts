import { IsNotEmpty, IsString, IsOptional, IsArray, ArrayMaxSize, ArrayMinSize, IsNumber } from 'class-validator';

export class CreateEquipoDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1, { message: 'El equipo debe tener al menos 1 Pokémon' })
  @ArrayMaxSize(6, { message: 'El equipo no puede tener más de 6 Pokémon' })
  @IsNumber({}, { each: true, message: 'Cada ID de Pokémon debe ser un número' })
  pokemonIds?: number[];
}
