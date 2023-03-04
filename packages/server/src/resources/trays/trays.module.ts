import { Module } from '@nestjs/common';
import { TraysService } from './trays.service';
import { TraysResolver } from './trays.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tray } from './entities/tray.entity';
import { ContainersModule } from '../containers/containers.module';

@Module({
  imports: [TypeOrmModule.forFeature([Tray]), ContainersModule],
  providers: [TraysResolver, TraysService],
  exports: [TraysService],
})
export class TraysModule {}
