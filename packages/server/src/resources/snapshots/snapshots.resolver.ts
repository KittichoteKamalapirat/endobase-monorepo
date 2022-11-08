import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateSnapshotInput } from './dto/create-snapshot.input';
import { Snapshot } from './entities/snapshot.entity';
import { SnapshotsService } from './snapshots.service';

@Resolver(() => Snapshot)
export class SnapshotsResolver {
  constructor(private readonly snapshotsService: SnapshotsService) {}

  @Mutation(() => Snapshot)
  createSnapshot(
    @Args('createSnapshotInput') createSnapshotInput: CreateSnapshotInput,
  ) {
    return this.snapshotsService.create(createSnapshotInput);
  }
}
