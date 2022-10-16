import { Module } from '@nestjs/common';
import { ContainersService } from './containers.service';
import { ContainersResolver } from './containers.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Container } from './entities/container.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Container])],
  providers: [ContainersResolver, ContainersService],
})
export class ContainersModule {}
