import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppService } from '../../app.service';
import { CreateSnapshotInput } from './dto/create-snapshot.input';
import { Snapshot } from './entities/snapshot.entity';

@Injectable()
export class SnapshotsService {
  private readonly logger = new Logger(AppService.name);
  constructor(
    @InjectRepository(Snapshot)
    private snapshotsRepository: Repository<Snapshot>,
  ) {}

  create(input: CreateSnapshotInput) {
    const newSnapshot = this.snapshotsRepository.create(input);
    return this.snapshotsRepository.save(newSnapshot);
  }

  async findAll() {
    const snapshots = await this.snapshotsRepository.find({
      relations: ['container'],
    });
    return snapshots;
  }
}
