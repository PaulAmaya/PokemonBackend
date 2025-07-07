import { Test, TestingModule } from '@nestjs/testing';
import { PokemonEnEquipoController } from './pokemon-en-equipo.controller';
import { PokemonEnEquipoService } from './pokemon-en-equipo.service';

describe('PokemonEnEquipoController', () => {
  let controller: PokemonEnEquipoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PokemonEnEquipoController],
      providers: [PokemonEnEquipoService],
    }).compile();

    controller = module.get<PokemonEnEquipoController>(PokemonEnEquipoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
