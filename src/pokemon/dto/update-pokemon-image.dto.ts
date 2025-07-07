import { IsNotEmpty, IsUrl } from 'class-validator';

export class UpdatePokemonImageDto {
  @IsNotEmpty()
  imagen_url: string;
}
