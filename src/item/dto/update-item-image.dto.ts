import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class UpdateItemImageDto {
  @IsNotEmpty()
  @IsString()
  imagen_url: string;
}
