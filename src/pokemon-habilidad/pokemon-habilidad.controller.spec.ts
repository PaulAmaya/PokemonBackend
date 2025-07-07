import { Test, TestingModule } from '@nestjs/testing';
import { PokemonHabilidadController } from './pokemon-habilidad.controller';
import { PokemonHabilidadService } from './pokemon-habilidad.service';

describe('PokemonHabilidadController', () => {
  let controller: PokemonHabilidadController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PokemonHabilidadController],
      providers: [PokemonHabilidadService],
    }).compile();

    controller = module.get<PokemonHabilidadController>(PokemonHabilidadController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
