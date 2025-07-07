import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovimientoSeleccionadoService } from './movimiento-seleccionado.service';
import { MovimientoSeleccionadoController } from './movimiento-seleccionado.controller';
import { MovimientoSeleccionado } from './entities/movimiento-seleccionado.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MovimientoSeleccionado])],
  controllers: [MovimientoSeleccionadoController],
  providers: [MovimientoSeleccionadoService],
  exports: [MovimientoSeleccionadoService],
})
export class MovimientoSeleccionadoModule {}
