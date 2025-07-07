import { Injectable } from '@nestjs/common';
import { CreateIvDto } from './dto/create-iv.dto';
import { UpdateIvDto } from './dto/update-iv.dto';

@Injectable()
export class IvService {
  create(createIvDto: CreateIvDto) {
    return 'This action adds a new iv';
  }

  findAll() {
    return `This action returns all iv`;
  }

  findOne(id: number) {
    return `This action returns a #${id} iv`;
  }

  update(id: number, updateIvDto: UpdateIvDto) {
    return `This action updates a #${id} iv`;
  }

  remove(id: number) {
    return `This action removes a #${id} iv`;
  }
}
