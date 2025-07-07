import { Test, TestingModule } from '@nestjs/testing';
import { PokemonMovimientoController } from './pokemon-movimiento.controller';
import { PokemonMovimientoService } from './pokemon-movimiento.service';

describe('PokemonMovimientoController', () => {
  let controller: PokemonMovimientoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PokemonMovimientoController],
      providers: [PokemonMovimientoService],
    }).compile();

    controller = module.get<PokemonMovimientoController>(PokemonMovimientoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
