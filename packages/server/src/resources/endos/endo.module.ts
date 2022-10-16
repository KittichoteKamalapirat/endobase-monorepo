import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Endo } from './entities/endo.entity';
import { EndosResolver } from './endos.resolver';
import { EndosService } from './endos.service';
import { SessionsModule } from '../sessions/sessions.module';

@Module({
  imports: [TypeOrmModule.forFeature([Endo]), SessionsModule],
  providers: [EndosResolver, EndosService],
})
export class EndosModule {}
