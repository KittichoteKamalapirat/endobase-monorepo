import { forwardRef, Module } from '@nestjs/common';
import { ActionsService } from './actions.service';
import { ActionsResolver } from './actions.resolver';
import { Action } from './entities/action.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionsModule } from '../sessions/sessions.module';
import { OfficersModule } from '../officers/officers.module';
import { EndosModule } from '../endos/endo.module';
import { EndoCronsModule } from '../endo-crons/endo-crons.module';
import { SerialportsModule } from '../serialports/serialports.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Action]),
    SessionsModule,
    OfficersModule,
    EndoCronsModule,
    SerialportsModule,
    forwardRef(() => EndosModule),
  ],
  providers: [ActionsResolver, ActionsService],
  exports: [ActionsService],
})
export class ActionsModule { }
