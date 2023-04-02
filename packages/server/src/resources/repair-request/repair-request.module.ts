import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EndosModule } from '../endos/endo.module';
import { OfficersModule } from '../officers/officers.module';
import { RepairRequest } from './entities/repair-request.entity';
import { RepairRequestResolver } from './repair-request.resolver';
import { RepairRequestService } from './repair-request.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([RepairRequest]),
    OfficersModule,
    EndosModule
  ],
  // exports: [ActionsService],
  providers: [RepairRequestResolver, RepairRequestService]
})
export class RepairRequestModule {}
