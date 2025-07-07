import { Test, TestingModule } from '@nestjs/testing';
import { NaturalezaService } from './naturaleza.service';

describe('NaturalezaService', () => {
  let service: NaturalezaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NaturalezaService],
    }).compile();

    service = module.get<NaturalezaService>(NaturalezaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
