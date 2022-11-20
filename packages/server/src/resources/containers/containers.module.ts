import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContainersResolver } from './containers.resolver';
import { ContainersService } from './containers.service';
import { Container } from './entities/container.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Container])],
  providers: [ContainersResolver, ContainersService],
  exports: [ContainersService],
})
export class ContainersModule {}
