import { IsNotEmpty, IsString } from 'class-validator';

export class CreateNaturalezaDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsString()
  stat_beneficiado: string;

  @IsNotEmpty()
  @IsString()
  stat_perjudicado: string;
}
