import { Module } from '@nestjs/common';
import { OfficersService } from './officers.service';
import { OfficersResolver } from './officers.resolver';
import { Officer } from './entities/officer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Officer])],
  providers: [OfficersResolver, OfficersService],
})
export class OfficersModule {}
