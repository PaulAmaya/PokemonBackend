import { Test, TestingModule } from '@nestjs/testing';
import { NaturalezaController } from './naturaleza.controller';
import { NaturalezaService } from './naturaleza.service';

describe('NaturalezaController', () => {
  let controller: NaturalezaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NaturalezaController],
      providers: [NaturalezaService],
    }).compile();

    controller = module.get<NaturalezaController>(NaturalezaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
