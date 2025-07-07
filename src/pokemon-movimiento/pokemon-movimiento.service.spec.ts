import { Test, TestingModule } from '@nestjs/testing';
import { PokemonMovimientoService } from './pokemon-movimiento.service';

describe('PokemonMovimientoService', () => {
  let service: PokemonMovimientoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PokemonMovimientoService],
    }).compile();

    service = module.get<PokemonMovimientoService>(PokemonMovimientoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
