import { PartialType } from '@nestjs/mapped-types';
import { CreateEvDto } from './create-ev.dto';

export class UpdateEvDto extends PartialType(CreateEvDto) {}
