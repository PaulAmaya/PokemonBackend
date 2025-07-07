import { Test, TestingModule } from '@nestjs/testing';
import { IvController } from './iv.controller';
import { IvService } from './iv.service';

describe('IvController', () => {
  let controller: IvController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IvController],
      providers: [IvService],
    }).compile();

    controller = module.get<IvController>(IvController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
