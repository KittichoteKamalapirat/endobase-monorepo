import { Module } from '@nestjs/common';
import { ActionsService } from './actions.service';
import { ActionsResolver } from './actions.resolver';
import { Action } from './entities/action.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionsModule } from '../sessions/sessions.module';

@Module({
  imports: [TypeOrmModule.forFeature([Action]), SessionsModule],
  providers: [ActionsResolver, ActionsService],
})
export class ActionsModule {}
