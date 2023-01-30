import {
  forwardRef, Module
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SerialportsModule } from '../serialports/serialports.module';
import { ContainersResolver } from './containers.resolver';
import { ContainersService } from './containers.service';
import { Container } from './entities/container.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Container]), forwardRef(() => SerialportsModule)],
  providers: [ContainersResolver, ContainersService],
  exports: [ContainersService],
})
export class ContainersModule { }
