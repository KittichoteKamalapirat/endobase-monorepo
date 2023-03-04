import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActionsModule } from '../actions/actions.module';
import { EndoCronsModule } from '../endo-crons/endo-crons.module';
import { SerialportsModule } from '../serialports/serialports.module';
import { SessionsModule } from '../sessions/sessions.module';
import { TraysModule } from '../trays/trays.module';
import { EndosResolver } from './endos.resolver';
import { EndosService } from './endos.service';
import { Endo } from './entities/endo.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Endo]),
    forwardRef(() => ActionsModule),
    forwardRef(() => EndoCronsModule),
    SessionsModule,
    SerialportsModule,
    TraysModule,
  ],
  providers: [EndosResolver, EndosService],
  exports: [EndosService],
})
export class EndosModule {}
