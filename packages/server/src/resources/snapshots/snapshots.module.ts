import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContainersModule } from '../containers/containers.module';
import { Snapshot } from './entities/snapshot.entity';
import { SnapshotsResolver } from './snapshots.resolver';
import { SnapshotsService } from './snapshots.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Snapshot]),
    forwardRef(() => ContainersModule),
  ],
  providers: [SnapshotsResolver, SnapshotsService],
  exports: [SnapshotsService],
})
export class SnapshotsModule { }
