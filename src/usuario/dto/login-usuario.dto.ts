import { IsNotEmpty, IsString } from 'class-validator';

export class LoginUsuarioDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
