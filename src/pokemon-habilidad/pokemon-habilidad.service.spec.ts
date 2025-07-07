import { Test, TestingModule } from '@nestjs/testing';
import { PokemonHabilidadService } from './pokemon-habilidad.service';

describe('PokemonHabilidadService', () => {
  let service: PokemonHabilidadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PokemonHabilidadService],
    }).compile();

    service = module.get<PokemonHabilidadService>(PokemonHabilidadService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
