import { Test, TestingModule } from '@nestjs/testing';
import { EvController } from './ev.controller';
import { EvService } from './ev.service';

describe('EvController', () => {
  let controller: EvController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EvController],
      providers: [EvService],
    }).compile();

    controller = module.get<EvController>(EvController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
