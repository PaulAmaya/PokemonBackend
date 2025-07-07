import { Injectable } from '@nestjs/common';
import { CreateNaturalezaDto } from './dto/create-naturaleza.dto';
import { UpdateNaturalezaDto } from './dto/update-naturaleza.dto';

@Injectable()
export class NaturalezaService {
  create(createNaturalezaDto: CreateNaturalezaDto) {
    return 'This action adds a new naturaleza';
  }

  findAll() {
    return `This action returns all naturaleza`;
  }

  findOne(id: number) {
    return `This action returns a #${id} naturaleza`;
  }

  update(id: number, updateNaturalezaDto: UpdateNaturalezaDto) {
    return `This action updates a #${id} naturaleza`;
  }

  remove(id: number) {
    return `This action removes a #${id} naturaleza`;
  }
}
