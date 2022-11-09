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
    private snapshotssRepository: Repository<Snapshot>,
  ) {}

  create(input: CreateSnapshotInput) {
    const newSnapshot = this.snapshotssRepository.create(input);
    return this.snapshotssRepository.save(newSnapshot);
  }
}
