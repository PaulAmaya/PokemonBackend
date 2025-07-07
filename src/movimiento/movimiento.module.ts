import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovimientoService } from './movimiento.service';
import { MovimientoController } from './movimiento.controller';
import { Movimiento } from './entities/movimiento.entity';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Movimiento]),
    CommonModule
  ],
  controllers: [MovimientoController],
  providers: [MovimientoService],
  exports: [MovimientoService],
})
export class MovimientoModule {}
