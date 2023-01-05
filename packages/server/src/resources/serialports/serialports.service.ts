import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ReadlineParser } from 'serialport';
import { AppService } from '../../app.service';
import {
  BLACK_COLOR_COMMAND, SERIALPORTS_PROVIDER
} from '../../constants';
import { SettingService } from '../../setting/setting.service';
import {
  containerTypeOptions,
  CONTAINER_TYPE_OBJ,
  CONTAINER_TYPE_VALUES,
  MyParser,
  MySerialPort
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
export class SerialportsService implements OnModuleInit {
  private readonly logger = new Logger(AppService.name);

  private activeSerialportObj = {} as { [key in CONTAINER_TYPE_VALUES]: boolean }

  constructor(
    private snapshotsService: SnapshotsService,
    @Inject(SERIALPORTS_PROVIDER)
    private serialports: MySerialPort,
    private containersService: ContainersService,
    private settingService: SettingService,
  ) {

  }

  async onModuleInit() {
    await this.settingService.initSetting()

    const parsers = {} as MyParser;

    Object.keys(this.serialports).forEach(async (key: CONTAINER_TYPE_VALUES) => {
      if (!this.serialports[key]) return;
      const parser = this.serialports[key].pipe(
        new ReadlineParser({ delimiter: '\r\n' }),
      );
      parsers[key] = parser;
    });




    const snapshotSettingMin = parseFloat(this.settingService.getSetting().containerSnapshotIntervalMin.value); // get the default value
    // ex. 60 mins * 8 active serialports
    this.settingService.counterCeil = snapshotSettingMin * this.getActiveSerialportNum() || Infinity;

    let counter = 0;

    // event listener on controller return
    containerTypeOptions.forEach((option) => {
      const col = option.value;

      parsers[col]?.on('data', async (data: string) => {
        this.setActiveSerialport(col)

        const { systemStatus, temp, hum } = formatSTS(data) || {};

        // update container stats every minute
        // cron job defined in snapshots service
        this.containersService.updateStats({
          col,
          currTemp: temp,
          currHum: hum,
        });

        // add a new snapshot
        if (data.includes('sts') && counter >= this.settingService.counterCeil) {
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
          const newSnapshot = await this.snapshotsService.create(input);

          // reset counter back to 0
          counter = 0
        } else {
          counter += 1;
        }

      });
    });

    // init activeSerialportObj
    Object.keys(CONTAINER_TYPE_OBJ).forEach(key => {
      this.activeSerialportObj[key] = false
    })
  }

  getActiveSerialports() {
    return this.activeSerialportObj
  }

  setActiveSerialport(container: CONTAINER_TYPE_VALUES) {
    this.activeSerialportObj[container] = true

    // update counterCeil
    const snapshotSettingMin = parseFloat(this.settingService.getSetting().containerSnapshotIntervalMin.value);
    this.settingService.counterCeil = this.getActiveSerialportNum() * snapshotSettingMin
  }

  getActiveSerialportNum() {
    // there could be 4 containers
    // but if only 2 is connected
    // active should be 2

    let counter = 0
    Object.keys(this.activeSerialportObj).forEach(key => {
      // if null then don't count, if sp then count
      if (this.activeSerialportObj[key]) counter++
    })
    return counter
  }

  //check every minute => createsnapshot every hour
  @Cron(CronExpression.EVERY_MINUTE)
  checkSystemStatus() {
    Object.keys(CONTAINER_TYPE_OBJ).forEach((key) => {
      console.log(
        `serialport ${key} is ${this.serialports[key]?.isOpen ? 'plugged' : 'unplugged'
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
      if (err) {
        return console.log('Error on write: ', err.message);
      }
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
      if (err) {
        return console.log('Error on write: ', err.message);
      }
    });
  }

  turnLightsOff({ col, row }: { col: CONTAINER_TYPE_VALUES; row: RowType }) {
    const colorCommand = BLACK_COLOR_COMMAND;

    const ledPosition = rowNumToLEDPositionTwoCols(row);

    const command = `:L${ledPosition}(${colorCommand})\r\n)`;

    this.serialports[col]?.write(command, (err) => {
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
    row,
    status
  }: RowAndColInput) {

    const blinkSetting = (await this.settingService.findByName("trayLocationBlinkingSec"))
    const secStr = blinkSetting.value

    const frequencyInterval = 1000
    let toBlinkCounter = Number(secStr) / (frequencyInterval / 1000)
    const blinkingInterval = setInterval(() => {
      if (toBlinkCounter <= 0) {
        clearInterval(blinkingInterval)
        this.writeColor({ // write the last time so it's not dark
          col: col,
          row: row,
          endoStatus: status,
        });
        return // so it does not move to the next line
      }
      this.writeColor({
        col: col,
        row: row,
        endoStatus: toBlinkCounter % 2 === 0 ? status : "being_used",
      });

      toBlinkCounter--
    }, frequencyInterval);

    return true
  }
  containerIsConnected(col: CONTAINER_TYPE_VALUES) {
    return !!this.serialports[col];
  }

  containerIsResponding(col: CONTAINER_TYPE_VALUES) {
    return this.activeSerialportObj[col];
  }
}
