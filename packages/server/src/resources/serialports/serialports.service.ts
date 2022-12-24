import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ReadlineParser, SerialPort } from 'serialport';
import { SimpleConsoleLogger } from 'typeorm';
import { AppService } from '../../app.service';
import {
  BLACK_COLOR_COMMAND,
  CONTAINER_NUM,
  SERIALPORTS_PROVIDER,
} from '../../constants';
import { SettingService } from '../../setting/setting.service';
import {
  containerTypeOptions,
  CONTAINER_TYPE_OBJ,
  CONTAINER_TYPE_VALUES,
  MyParser,
  MySerialPort,
} from '../../types/CONTAINER_TYPE';
import { formatSTS } from '../../utils/formatSTS';
import { getConnectedArduinos } from '../../utils/getConnectedArduinos';
import { initSerialports } from '../../utils/initSerialPorts';
import { rowNumToLEDPositionTwoCols } from '../../utils/rowNumToLEDPositionTwoCols';
import { writeColorCommand } from '../../utils/writeColorCommand';
import { ContainersService } from '../containers/containers.service';

import { ENDO_STATUS } from '../endos/entities/endo.entity';
import { CreateSnapshotInput } from '../snapshots/dto/create-snapshot.input';
import { SnapshotsService } from '../snapshots/snapshots.service';
import { RowType } from '../trays/entities/tray.entity';
import { RowAndColInput } from './dto/row-and-col.input';

@Injectable()
export class SerialportsService {
  private readonly logger = new Logger(AppService.name);

  constructor(
    private snapshotsService: SnapshotsService,
    @Inject(SERIALPORTS_PROVIDER)
    private serialports: MySerialPort,
    private containersService: ContainersService,
    private settingService: SettingService,
  ) {
    const parsers = {} as MyParser;

    Object.keys(this.serialports).forEach((key: CONTAINER_TYPE_VALUES) => {
      if (!this.serialports[key]) return;
      const parser = this.serialports[key].pipe(
        new ReadlineParser({ delimiter: '\r\n' }),
      );
      parsers[key] = parser;
    });

    let counter = 0;
    let COUNTER_CEIL = this.settingService.getSnapshotInterval(); // get the default value

    // update counterCeil for the first time
    (async () => {
      const minsString = (await this.settingService.findSnapshotIntervalMins())
        .value;
      const minsNum = parseInt(minsString);

      this.settingService.setSnapshotInterval(minsNum); // update the global variable too
      COUNTER_CEIL = CONTAINER_NUM * minsNum;
      return minsNum;
    })();

    // event listener on controller return
    containerTypeOptions.forEach((option) => {
      const col = option.value;
      parsers[col]?.on('data', async (data: string) => {
        console.log('got response from container ', col);
        console.log('COUNTER_CEIL', COUNTER_CEIL);
        console.log('counter', counter);
        const { systemStatus, temp, hum } = formatSTS(data) || {};

        COUNTER_CEIL =
          CONTAINER_NUM * this.settingService.getSnapshotInterval(); // if the interval value changes => recalculate

        // update container stats
        // cron job defined in snapshots service
        containersService.updateStats({
          col,
          currTemp: temp,
          currHum: hum,
        });

        if (data.includes('sts') && counter >= COUNTER_CEIL) {
          // only save snapshot if it is reading system status

          const container = await this.containersService.findOneByContainerChar(
            col,
          );

          const input: CreateSnapshotInput = {
            systemStatus,
            temp,
            hum,
            containerId: container.id,
          };
          this.snapshotsService.create(input);
        }
        counter += 1;
      });
    });
  }
  // @Cron(CronExpression.EVERY_10_MINUTES)
  // @Cron(CronExpression.EVERY_HOUR)
  @Cron(CronExpression.EVERY_MINUTE)
  checkSystemStatus() {
    console.log('-----------check status cron----------');
    Object.keys(CONTAINER_TYPE_OBJ).forEach((key) => {
      console.log(
        `serialport ${key} is ${this.serialports[key]?.isOpen ? 'open' : 'close'
        }`,
      );
    });

    Object.keys(this.serialports).forEach((key) => {
      this.serialports[key]?.write(':STS\r\n');
    });

    this.logger.log('Read STS every 1 sec');
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async checkSerialportConnections() {
    const connectedArduinos = await getConnectedArduinos();
    // recheck ports
    initSerialports({ connectedArduinos, serialports: this.serialports });
  }
  // also could be use when turn lights on
  writeColor({
    col,
    row,
    endoStatus,
  }: {
    col: CONTAINER_TYPE_VALUES;
    row: RowType;
    endoStatus: ENDO_STATUS;
  }) {
    const command = writeColorCommand({
      endoStatus,
      row,
    });

    this.serialports[col]?.write(command, (err) => {
      // if (error) console.log(error?.message);
      if (err) {
        return console.log('Error on write: ', err.message);
      }
      console.log('wrote');
    });
  }

  setDryingTime({
    col,
    row,
    endoStatus,
  }: {
    col: CONTAINER_TYPE_VALUES;
    row: RowType;
    endoStatus: ENDO_STATUS;
  }) {
    const command = writeColorCommand({
      endoStatus,
      row,
    });

    this.serialports[col]?.write(command, (err) => {
      // if (error) console.log(error?.message);
      if (err) {
        return console.log('Error on write: ', err.message);
      }
      console.log('wrote ', command);
    });
  }

  turnLightsOff({ col, row }: { col: CONTAINER_TYPE_VALUES; row: RowType }) {
    const colorCommand = BLACK_COLOR_COMMAND;

    const ledPosition = rowNumToLEDPositionTwoCols(row);

    const command = `:L${ledPosition}(${colorCommand})\r\n)`;

    this.serialports[col]?.write(command, (err) => {
      // if (error) console.log(error?.message);
      if (err) {
        return console.log('Error on write: ', err.message);
      }
      console.log('turned lights off');
    });
  }

  turnLightsOn({
    col,
    row,
    status,
  }: {
    col: CONTAINER_TYPE_VALUES;
    row: RowType;
    status: ENDO_STATUS;
  }) {
    this.writeColor({
      col: col,
      row: row,
      endoStatus: status,
    });
  }

  async blinkLocation({
    col,
    row
  }: RowAndColInput) {

    const blinkSetting = (await this.settingService.findByName("trayLocationBlinkingSec"))
    const secStr = blinkSetting.value

    const frequencyInterval = 1000
    let toBlinkCounter = Number(secStr) / (frequencyInterval / 1000)
    const blinkingInterval = setInterval(() => {
      if (toBlinkCounter <= 0) {
        clearInterval(blinkingInterval)
        return // so it does not move to the next line
      }
      this.writeColor({
        col: col,
        row: row,
        endoStatus: toBlinkCounter % 2 === 0 ? "ready" : "being_used",
      });

      toBlinkCounter--
    }, frequencyInterval);

    return true
  }
  containerIsConnected(col: CONTAINER_TYPE_VALUES) {
    return !!this.serialports[col];
  }
}
