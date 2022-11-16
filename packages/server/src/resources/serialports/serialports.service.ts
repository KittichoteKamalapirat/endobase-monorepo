import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ReadlineParser, SerialPort } from 'serialport';
import { AppService } from '../../app.service';
import {
  CONTAINER_NUM,
  DEFAULT_SNAPSHOT_INTERVAL_MINS,
  SERIALPORTS_PROVIDER,
} from '../../constants';
import { SettingService } from '../../setting/setting.service';
import { formatSTS } from '../../utils/formatSTS';
import { writeColorCommand } from '../../utils/writeColorCommand';
import { ContainersService } from '../containers/containers.service';
import { ColType } from '../containers/entities/container.entity';
import { ENDO_STATUS } from '../endos/entities/endo.entity';
import { CreateSnapshotInput } from '../snapshots/dto/create-snapshot.input';
import { SnapshotsService } from '../snapshots/snapshots.service';
import { RowType } from '../trays/entities/tray.entity';

interface ParserAndContainer {
  col: ColType;
  parser: ReadlineParser;
}
@Injectable()
export class SerialportsService {
  private readonly logger = new Logger(AppService.name);
  constructor(
    private snapshotsService: SnapshotsService,
    @Inject(SERIALPORTS_PROVIDER)
    private serialports: { A: SerialPort; B: SerialPort; C: SerialPort },
    private snapshotService: SnapshotsService,
    private containersService: ContainersService,
    private settingService: SettingService,
  ) {
    const parserA = this.serialports.A.pipe(
      new ReadlineParser({ delimiter: '\r\n' }),
    );
    const parserB = this.serialports.B.pipe(
      new ReadlineParser({ delimiter: '\r\n' }),
    );
    const parserC = this.serialports.C.pipe(
      new ReadlineParser({ delimiter: '\r\n' }),
    );

    const parsers: ParserAndContainer[] = [
      { parser: parserA, col: 'A' },
      { parser: parserB, col: 'B' },
      { parser: parserC, col: 'C' },
    ];

    let counter = 0;
    let COUNTER_CEIL = CONTAINER_NUM * DEFAULT_SNAPSHOT_INTERVAL_MINS; //by defarult

    // update counterCil
    (async () => {
      const mins = (await this.settingService.findSnapshotIntervalMins()).value;
      COUNTER_CEIL = CONTAINER_NUM * parseInt(mins); // update this async
      return mins;
    })();

    // event listener on controller return
    parsers.forEach((parserAndCon, index) => {
      parserAndCon.parser.on('data', async (data: string) => {
        const { systemStatus, temp, hum } = formatSTS(data);

        console.log('counter', counter);
        console.log('COUNTER_CEIL', COUNTER_CEIL);

        // update container stats
        // cron job defined in snapshots service
        containersService.updateStats({
          col: parserAndCon.col,
          currTemp: temp,
          currHum: hum,
        });

        if (data.includes('sts') && counter >= COUNTER_CEIL) {
          // only save snapshot if it is reading system status
          const col = String.fromCharCode(index + 65) as ColType; // 65 = A
          const container = await this.containersService.findOneByContainerChar(
            col,
          );

          const input: CreateSnapshotInput = {
            systemStatus,
            temp,
            hum,
            containerId: container.id,
          };
          snapshotService.create(input);
        }
        counter += 1;
      });
    });
  }
  // @Cron(CronExpression.EVERY_10_MINUTES)
  // @Cron(CronExpression.EVERY_HOUR)
  @Cron(CronExpression.EVERY_10_SECONDS)
  checkSystemStatus() {
    console.log('sp a', this.serialports['A'].isOpen);
    console.log('sp b', this.serialports['B'].isOpen);
    console.log('sp c', this.serialports['C'].isOpen);

    Object.keys(this.serialports).forEach((key) => {
      this.serialports[key].write(':STS\r\n');
    });

    this.logger.log('Read STS every 1 sec');
  }

  writeColor({
    col,
    row,
    endoStatus,
  }: {
    col: ColType;
    row: RowType;
    endoStatus: ENDO_STATUS;
  }) {
    const command = writeColorCommand({
      endoStatus,
      row,
    });

    this.serialports[col].write(command, (err) => {
      // if (error) console.log(error?.message);
      if (err) {
        return console.log('Error on write: ', err.message);
      }
      console.log('wrote');
    });
  }
}
