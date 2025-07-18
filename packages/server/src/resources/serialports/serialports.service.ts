import {
  Injectable,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';
import { Cron, CronExpression, Timeout } from '@nestjs/schedule';
import {
  colorToNumber,
  CREATE_SNAPSHOT_TIMEOUT,
  INPUT_REGISTER_LENGTH,
  SET_ACTIVE_MODBUS_TIMEOUT,
  SLAVE_ADDRESS,
  UPDATE_CONTAINER_STATS_TIMEOUT,
} from '../../constants';
import { SettingService } from '../../setting/setting.service';
import { CONTAINER_TYPE_VALUES } from '../../types/CONTAINER_TYPE';
import { ContainersService } from '../containers/containers.service';
import {
  CONTAINER_TYPE_OBJ,
  getColumnToArduinoIdMapper,
} from './../../constants';

import { forwardRef, Inject } from '@nestjs/common';
import ModbusRTU from 'modbus-serial';
import { Env } from '../../utils/getEnvPath';
import { UpdateContainerStatsInput } from '../containers/dto/update-container-stats.input';
import { ENDO_STATUS, statusToColor } from '../endos/entities/endo.entity';
import { CreateSnapshotInput } from '../snapshots/dto/create-snapshot.input';
import { SnapshotsService } from '../snapshots/snapshots.service';
import { RowType } from '../trays/entities/tray.entity';
import { RowAndColInput } from './dto/row-and-col.input';

const columnToArduinoIdMapper = getColumnToArduinoIdMapper(
  process.env.NODE_ENV as Env,
);

const COM_PORT = process.env.COM_PORT;
@Injectable()
export class SerialportsService implements OnModuleInit, OnApplicationShutdown {
  private modbus = new ModbusRTU();

  // active serialport means those that are responding
  private activeSerialportObj = {} as {
    [key in CONTAINER_TYPE_VALUES]: boolean;
  };

  constructor(
    private snapshotsService: SnapshotsService,
    @Inject(forwardRef(() => ContainersService))
    private containersService: ContainersService,
    private settingService: SettingService,
  ) {
    process.on('SIGINT', async () => {
      console.log('🛑 SIGINT received. Cleaning up...');
      await this.closeModbus();
      process.exit(0);
    });

    process.on('SIGTERM', async () => {
      console.log('🛑 SIGTERM received. Cleaning up...');
      await this.closeModbus();
      process.exit(0);
    });
  }

  async onModuleInit() {
    Object.keys(CONTAINER_TYPE_OBJ).forEach(
      (key) => (this.activeSerialportObj[key] = false),
    ); // make all fale by default

    try {
      if (process.env.SHOULD_CONNECT_MODBUS === 'true') {
        console.log('trying to connect to port.', COM_PORT);

        console.log('modbus is open', this.modbus.isOpen);
        if (this.modbus.isOpen) {
          await this.closeModbus();
        }

        await this.modbus.connectRTUBuffered(COM_PORT, { baudRate: 9600 });
        console.log('✅ Successfully init modbus..');
        await this.settingService.initSetting();
      }
    } catch (error) {
      console.log('❌ error init modbus in serialport.server', error);
    }
  }

  async onApplicationShutdown(signal?: string) {
    console.log(`Application is shutting down due to: ${signal}`);
    await this.closeModbus();
  }

  private async closeModbus() {
    if (this.modbus.isOpen) {
      return new Promise<void>((resolve, reject) => {
        this.modbus.close((err) => {
          if (err) {
            console.error('Error closing Modbus:', err);
            reject(err);
          } else {
            console.log('✅ Successfully closed Modbus connection.');
            resolve();
          }
        });
      });
    }
  }

  @Timeout(SET_ACTIVE_MODBUS_TIMEOUT)
  async setActiveSerialport() {
    const syncSetActiveSerialport = async () => {
      const activeSerialportObj = {};

      for (const key of Object.keys(CONTAINER_TYPE_OBJ)) {
        const arduinoId = columnToArduinoIdMapper[key];

        this.modbus.setID(arduinoId);

        try {
          const RETRY = 5;
          for (let i = 0; i < RETRY; i++) {
            console.log('Trying', key, 'Attempt', i + 1);

            if (!activeSerialportObj[key]) {
              try {
                // Timeout handling must be inside the loop to reset the timeout each attempt
                const timeoutPromise = new Promise((_, reject) =>
                  setTimeout(() => reject(new Error('Timeout')), 3000),
                );

                const val = await Promise.race([
                  this.modbus.readInputRegisters(0, 3),
                  timeoutPromise,
                ]);

                if (val) {
                  console.log('set', key, 'to true');
                  activeSerialportObj[key] = true;
                  break; // Exit loop if successful
                } else {
                  console.log('no val back from', key);
                  console.log('wait 2 sec');
                  await new Promise((resolve) => setTimeout(resolve, 2000));
                  activeSerialportObj[key] = false;
                }
              } catch (error) {
                console.error(`Attempt ${i + 1} failed for`, key, '-', error);
                console.log('wait 2 sec');
                await new Promise((resolve) => setTimeout(resolve, 2000));
                if (i === RETRY - 1) throw error; // Throw error only if all attempts fail
              }
            }
          }
        } catch (error) {
          console.error('⚠️ Cannot set container active:', key);
          console.error('Error:', error);
        }
      }

      return activeSerialportObj;
    };
    try {
      const activeSerialportObj = (await syncSetActiveSerialport()) as Record<
        CONTAINER_TYPE_VALUES,
        boolean
      >;
      this.activeSerialportObj = activeSerialportObj;
      console.log('active ports', this.activeSerialportObj);
    } catch (error) {
      console.error(error);
    }
  }

  @Timeout(CREATE_SNAPSHOT_TIMEOUT)
  async createSnapshotTimeout() {
    // wait a bit for modbus to connect
    await this.createSnapshot();
  }

  @Cron(CronExpression.EVERY_HOUR)
  async createSnapshotCron() {
    await this.createSnapshot();
  }

  async createSnapshot() {
    const syncCreateSnapshots = async () => {
      // do not return anything inside a loop => exit immediately
      // If I need any data => create empty array and push or reassign
      for (const key of Object.keys(CONTAINER_TYPE_OBJ)) {
        const arduinoId = columnToArduinoIdMapper[key];
        this.modbus.setID(arduinoId);

        const container = await this.containersService.findOneByContainerChar(
          key as CONTAINER_TYPE_VALUES,
        );

        const val = await this.modbus.readInputRegisters(
          SLAVE_ADDRESS,
          INPUT_REGISTER_LENGTH,
        ); // read 3 registers starting from  at address 0 (first register)

        const systemStatus = String(val.data[1]);
        const temp = String(val.data[2] / 10);
        const hum = String(val.data[3] / 10);

        const input: CreateSnapshotInput = {
          systemStatus,
          temp,
          hum,
          containerId: container.id,
        };
        await this.snapshotsService.create(input);
      }
    };
    try {
      await syncCreateSnapshots();
    } catch (error) {
      console.error(error);
    }
  }

  // wait a bit for modbus to connect
  @Timeout(UPDATE_CONTAINER_STATS_TIMEOUT)
  async updateContainerStatusCronTimeout() {
    await this.updateContainerStatus();
  }

  @Cron('*/15 * * * * *')
  async updateContainerStatusCron() {
    await this.updateContainerStatus();
  }

  async updateContainerStatus() {
    if ((process.env.NODE_ENV as Env) === 'showcase') return;
    const syncUpdateContainers = async () => {
      for (const key of Object.keys(CONTAINER_TYPE_OBJ)) {
        const arduinoId = columnToArduinoIdMapper[key];

        this.modbus.setID(arduinoId);

        try {
          const val = await this.modbus.readInputRegisters(0, 4); // read 3 registers starting from  at address 0 (first register)
          // update just in case the sp did not init correctly when server starts
          if (typeof val.data[1] === 'number') {
            // got value back
            this.activeSerialportObj[key] = true;
          }

          const temp = String(val.data[2] / 10);
          const hum = String(val.data[3] / 10);

          const input: UpdateContainerStatsInput = {
            col: key as CONTAINER_TYPE_VALUES,
            currTemp: temp,
            currHum: hum,
          };

          await this.containersService.updateStats(input);
        } catch (error) {
          console.error('error in synUpdateContainers', error);
        }
      }
    };
    try {
      await syncUpdateContainers();
    } catch (error) {
      console.error('error update container status', error.message);
    }
  }

  getReversePosition(row: RowType) {
    if (process.env.NODE_ENV === 'chonburi') return 99 + row;

    const reverseRow = 25 - row; // 9 => 16, 16 => 9
    const calculatedRowNum = row <= 8 ? row : reverseRow;
    return 99 + calculatedRowNum; // 100 => row 1, 115 => row 16
  }

  async writeColor({
    col,
    row,
    endoStatus,
  }: {
    col: CONTAINER_TYPE_VALUES;
    row: RowType;
    endoStatus: ENDO_STATUS;
  }) {
    try {
      // col
      const arduinoId = columnToArduinoIdMapper[col];
      await this.modbus.setID(arduinoId);

      const position = this.getReversePosition(row);

      // color
      const color = statusToColor[endoStatus];

      await this.modbus.writeRegister(position, color); // 0 = off
      return true;
    } catch (error) {
      return false;
    }
  }

  async turnLightsOff({
    col,
    row,
  }: {
    col: CONTAINER_TYPE_VALUES;
    row: RowType;
  }) {
    try {
      // col
      const arduinoId = columnToArduinoIdMapper[col];
      await this.modbus.setID(arduinoId);

      // row
      const position = this.getReversePosition(row);

      // color
      const color = colorToNumber.off;
      await this.modbus.writeRegister(position, color); // 0 = off

      return true;
    } catch (error) {
      return false;
    }
  }

  async turnLightsOn({
    col,
    row,
    status,
  }: {
    col: CONTAINER_TYPE_VALUES;
    row: RowType;
    status: ENDO_STATUS;
  }) {
    await this.writeColor({
      col: col,
      row: row,
      endoStatus: status,
    });
  }

  // async blinkLocation({ col, row, status }: RowAndColInput) {
  //   const blinkSetting = await this.settingService.findByName(
  //     'trayLocationBlinkingSec',
  //   );
  //   const secStr = blinkSetting.value;

  //   const frequencyInterval = 1000;
  //   let toBlinkCounter = Number(secStr) / (frequencyInterval / 1000);
  //   const blinkingInterval = setInterval(() => {
  //     if (toBlinkCounter <= 0) {
  //       clearInterval(blinkingInterval);
  //       this.writeColor({
  //         // write the last time so it's not dark
  //         col: col,
  //         row: row,
  //         endoStatus: status,
  //       });
  //       return; // so it does not move to the next line
  //     }
  //     this.writeColor({
  //       col: col,
  //       row: row,
  //       endoStatus: toBlinkCounter % 2 === 0 ? 'drying' : 'being_used', // ฟ้าสลับกับ
  //     });

  //     toBlinkCounter--;
  //   }, frequencyInterval);

  //   return true;
  // }

  containerIsResponding(col: CONTAINER_TYPE_VALUES) {
    return this.activeSerialportObj[col];
  }
}
