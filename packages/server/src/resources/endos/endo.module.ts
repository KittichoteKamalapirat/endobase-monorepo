import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActionsModule } from '../actions/actions.module';
import { SessionsModule } from '../sessions/sessions.module';
import { EndosResolver } from './endos.resolver';
import { EndosService } from './endos.service';
import { Endo } from './entities/endo.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Endo]),
    forwardRef(() => ActionsModule),
    SessionsModule,
  ],
  providers: [EndosResolver, EndosService],
  exports: [EndosService],
})
export class EndosModule {}
