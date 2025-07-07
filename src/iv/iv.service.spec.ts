import { Test, TestingModule } from '@nestjs/testing';
import { IvService } from './iv.service';

describe('IvService', () => {
  let service: IvService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IvService],
    }).compile();

    service = module.get<IvService>(IvService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
