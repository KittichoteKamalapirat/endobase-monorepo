import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EndosModule } from '../endos/endo.module';
import { EndoCronsResolver } from './endo-crons.resolver';
import { EndoCronsService } from './endo-crons.service';
import { EndoCron } from './entities/endo-cron.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([EndoCron]),
    forwardRef(() => EndosModule),
  ],

  providers: [EndoCronsService, EndoCronsResolver],
  exports: [EndoCronsService],
})
export class EndoCronsModule {}
