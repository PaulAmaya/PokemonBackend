import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ChangeOwnPasswordDto {
  @IsNotEmpty()
  @IsString()
  currentPassword: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  newPassword: string;
}
