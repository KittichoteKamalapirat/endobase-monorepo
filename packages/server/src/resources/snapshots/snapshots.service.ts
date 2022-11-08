import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { SerialPort } from 'serialport';
import { Repository } from 'typeorm';
import { AppService } from '../../app.service';
import { SERIALPORTS_PROVIDER } from '../../constants';
// import {
//   allPorts,
//   port1,
//   port2,
//   port3,
// } from '../serialports/serialportsInstances';
import { CreateSnapshotInput } from './dto/create-snapshot.input';
import { Snapshot } from './entities/snapshot.entity';

@Injectable()
export class SnapshotsService {
  private readonly logger = new Logger(AppService.name);
  constructor(
    @InjectRepository(Snapshot)
    private snapshotssRepository: Repository<Snapshot>,
    @Inject(SERIALPORTS_PROVIDER)
    private serialports: { A: SerialPort; B: SerialPort; C: SerialPort },
  ) {}

  @Cron(CronExpression.EVERY_10_MINUTES)
  // @Cron(CronExpression.EVERY_HOUR)
  checkSystemStatus() {
    // const port1 = allPorts[0];
    // const port2 = allPorts[0];
    // const port3 = allPorts[0];
    // allPorts.forEach((port) => port.write(':STS\r\n'));
    console.log('sp a', this.serialports['A'].isOpen);
    console.log('sp b', this.serialports['B'].isOpen);
    console.log('sp c', this.serialports['C'].isOpen);

    Object.keys(this.serialports).forEach((key) => {
      this.serialports[key].write(':STS\r\n');
    });

    // this.serialports.A.write(':L00(000,000,255)\r\n');
    // port1.write(':STS\r\n');
    this.logger.log('Read STS every 1 sec');
  }

  create(input: CreateSnapshotInput) {
    const newSnapshot = this.snapshotssRepository.create(input);
    return this.snapshotssRepository.save(newSnapshot);
  }

  @Cron(CronExpression.EVERY_10_SECONDS)
  handleCron() {
    this.logger.log('Called every 10 secs');
  }
}
