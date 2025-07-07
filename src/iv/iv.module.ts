import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IvService } from './iv.service';
import { IvController } from './iv.controller';
import { IV } from './entities/iv.entity';

@Module({
  imports: [TypeOrmModule.forFeature([IV])],
  controllers: [IvController],
  providers: [IvService],
  exports: [IvService],
})
export class IvModule {}
