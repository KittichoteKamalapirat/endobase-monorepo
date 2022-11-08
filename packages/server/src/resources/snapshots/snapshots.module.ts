import { Module } from '@nestjs/common';
import { SnapshotsService } from './snapshots.service';
import { SnapshotsResolver } from './snapshots.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Snapshot } from './entities/snapshot.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Snapshot])],
  providers: [SnapshotsResolver, SnapshotsService],
  exports: [SnapshotsService],
})
export class SnapshotsModule {}
