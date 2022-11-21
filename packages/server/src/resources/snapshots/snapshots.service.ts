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

@Injectable()
export class SnapshotsService {
  private readonly logger = new Logger(AppService.name);
  constructor(
    @InjectRepository(Snapshot)
    private snapshotsRepository: Repository<Snapshot>,
    private containersService: ContainersService,
  ) {}

  async create(input: CreateSnapshotInput) {
    const newSnapshot = this.snapshotsRepository.create(input);
    await this.snapshotsRepository.save(newSnapshot);
    const withContainer = this.snapshotsRepository.findOne({
      where: { id: newSnapshot.id },
      relations: ['container'],
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
}
