import { Test, TestingModule } from '@nestjs/testing';
import { PokemonEnEquipoService } from './pokemon-en-equipo.service';

describe('PokemonEnEquipoService', () => {
  let service: PokemonEnEquipoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PokemonEnEquipoService],
    }).compile();

    service = module.get<PokemonEnEquipoService>(PokemonEnEquipoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
