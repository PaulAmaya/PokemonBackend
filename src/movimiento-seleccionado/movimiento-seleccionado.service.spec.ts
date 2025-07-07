import { Test, TestingModule } from '@nestjs/testing';
import { MovimientoSeleccionadoService } from './movimiento-seleccionado.service';

describe('MovimientoSeleccionadoService', () => {
  let service: MovimientoSeleccionadoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MovimientoSeleccionadoService],
    }).compile();

    service = module.get<MovimientoSeleccionadoService>(MovimientoSeleccionadoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
