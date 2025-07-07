import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class UpdateMovimientoImageDto {
  @IsNotEmpty()
  @IsString()
  imagen_url: string;
}
