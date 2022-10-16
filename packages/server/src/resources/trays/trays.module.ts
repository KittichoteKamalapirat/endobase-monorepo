import { Module } from '@nestjs/common';
import { TraysService } from './trays.service';
import { TraysResolver } from './trays.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tray } from './entities/tray.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tray])],
  providers: [TraysResolver, TraysService],
})
export class TraysModule {}
