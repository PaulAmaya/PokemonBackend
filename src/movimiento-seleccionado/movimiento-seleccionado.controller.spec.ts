import { Test, TestingModule } from '@nestjs/testing';
import { MovimientoSeleccionadoController } from './movimiento-seleccionado.controller';
import { MovimientoSeleccionadoService } from './movimiento-seleccionado.service';

describe('MovimientoSeleccionadoController', () => {
  let controller: MovimientoSeleccionadoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovimientoSeleccionadoController],
      providers: [MovimientoSeleccionadoService],
    }).compile();

    controller = module.get<MovimientoSeleccionadoController>(MovimientoSeleccionadoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
