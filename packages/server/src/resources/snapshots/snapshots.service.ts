import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppService } from '../../app.service';
import { CreateSnapshotInput } from './dto/create-snapshot.input';
import { Snapshot } from './entities/snapshot.entity';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { ContainersService } from '../containers/containers.service';
import { PubSub } from 'graphql-subscriptions';
import { snapshotTriggertName } from 'src/constants';

@Injectable()
export class SnapshotsService {
  //subscription

  public pubSub: PubSub;
  private readonly logger = new Logger(AppService.name);
  constructor(
    @InjectRepository(Snapshot)
    private snapshotsRepository: Repository<Snapshot>,
    private containersService: ContainersService,
  ) {
    this.pubSub = new PubSub();
  }

  async create(input: CreateSnapshotInput) {
    const newSnapshotInput = this.snapshotsRepository.create(input);

    const newSnapshot = await this.snapshotsRepository.save(newSnapshotInput);

    const withContainer = await this.snapshotsRepository.findOne({
      where: { id: newSnapshot.id },
      relations: ['container'],
    });

    // emit so the subscribe listener got triggered
    this.pubSub.publish(snapshotTriggertName, {
      subscribeToOverHumOrTemp: withContainer, // key has to be subscription name
    });

    return withContainer;
  }

  async paginate(options: IPaginationOptions): Promise<Pagination<Snapshot>> {
    const paginatedResults = await paginate<Snapshot>(
      this.snapshotsRepository,
      options,
    );
    await Promise.all(
      paginatedResults.items.map(async (item) => {
        const container = await this.containersService.findOne(
          item.containerId,
        );
        item.container = container;
        return item;
      }),
    );

    return paginatedResults;
  }

  async findAll() {
    const snapshots = await this.snapshotsRepository.find({
      relations: ['container'],
    });
    return snapshots;
  }

  // for admin
  async removeAllRows() {
    try {
      const snapshots = await this.findAll();

      await Promise.all(
        snapshots.map((snapshot) =>
          this.snapshotsRepository.delete({ id: snapshot.id }),
        ),
      );
    } catch (error) {
      console.error('error remove snapshots', error);
    }
  }
}
