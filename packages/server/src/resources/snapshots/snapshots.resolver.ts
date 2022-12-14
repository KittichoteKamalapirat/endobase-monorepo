/* eslint-disable @typescript-eslint/no-unused-vars */
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { Pagination } from 'nestjs-typeorm-paginate';
import { snapshotTriggertName } from 'src/constants';
import { PaginatedInput } from "../common/dto/import { InputType, Int, Field } from '@nestjs/PaginatedInput";
import { CreateSnapshotInput } from './dto/create-snapshot.input';
import { PaginatedSnapshotOutput } from './dto/paginated-snapshot.output';
import { Snapshot } from './entities/snapshot.entity';
import { SnapshotsService } from './snapshots.service';

@Resolver(() => Snapshot)
export class SnapshotsResolver {
  // pubSub: PubSub;
  constructor(private readonly snapshotsService: SnapshotsService) {
    // this.pubSub = new PubSub();
  }

  @Mutation(() => Snapshot)
  async createSnapshot(@Args('input') input: CreateSnapshotInput) {
    const newSnapshot = await this.snapshotsService.create(input);
    return newSnapshot;
  }

  @Subscription(() => Snapshot, {
    filter: (payload, variables) => {
      const humExceeds =
        parseFloat((payload.subscribeToOverHumOrTemp as Snapshot).hum) >
        parseFloat(variables.humThreshold);
      const tepmExceeds =
        parseFloat((payload.subscribeToOverHumOrTemp as Snapshot).temp) >
        parseFloat(variables.tempThreshold);
      return humExceeds || tepmExceeds;
    },
  })
  subscribeToOverHumOrTemp(
    @Args('humThreshold', { type: () => String }) humThreshold: string, // use above
    @Args('tempThreshold', { type: () => String }) tempThreshold: string,
  ) {
    return this.snapshotsService.pubSub.asyncIterator(snapshotTriggertName);
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
