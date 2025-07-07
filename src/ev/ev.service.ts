import { Injectable } from '@nestjs/common';
import { CreateEvDto } from './dto/create-ev.dto';
import { UpdateEvDto } from './dto/update-ev.dto';

@Injectable()
export class EvService {
  create(createEvDto: CreateEvDto) {
    return 'This action adds a new ev';
  }

  findAll() {
    return `This action returns all ev`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ev`;
  }

  update(id: number, updateEvDto: UpdateEvDto) {
    return `This action updates a #${id} ev`;
  }

  remove(id: number) {
    return `This action removes a #${id} ev`;
  }
}
