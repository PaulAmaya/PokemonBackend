import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EvService } from './ev.service';
import { EvController } from './ev.controller';
import { EV } from './entities/ev.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EV])],
  controllers: [EvController],
  providers: [EvService],
  exports: [EvService],
})
export class EvModule {}
