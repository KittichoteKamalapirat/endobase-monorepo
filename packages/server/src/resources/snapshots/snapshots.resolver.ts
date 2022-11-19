import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Pagination } from 'nestjs-typeorm-paginate';
import { PaginatedInput } from "../common/dto/import { InputType, Int, Field } from '@nestjs/PaginatedInput";
import { CreateSnapshotInput } from './dto/create-snapshot.input';
import { PaginatedSnapshotOutput } from './dto/paginated-snapshot.output';
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

  @Query(() => [Snapshot], { name: 'snapshots' })
  findAll() {
    return this.snapshotsService.findAll();
  }

  @Query(() => PaginatedSnapshotOutput, { name: 'paginatedSnapshots' })
  async findPaginatedSnapshots(
    @Args('input', { type: () => PaginatedInput })
    input: PaginatedInput,
  ): Promise<Pagination<Snapshot>> {
    const result = await this.snapshotsService.paginate(input);
    return result;
  }
}
