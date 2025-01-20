import { getColumnToArduinoIdMapper } from './../../constants';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Cron, CronExpression, Timeout } from '@nestjs/schedule';
import { AppService } from '../../app.service';
import {
  colorToNumber,
  COM_PORT,
  CREATE_SNAPSHOT_TIMEOUT,
  SET_ACTIVE_MODBUS_TIMEOUT,
  UPDATE_CONTAINER_STATS_TIMEOUT,
  SLAVE_ADDRESS,
  INPUT_REGISTER_LENGTH,
} from '../../constants';
import { SettingService } from '../../setting/setting.service';
import {
  CONTAINER_TYPE_OBJ,
  CONTAINER_TYPE_VALUES,
} from '../../types/CONTAINER_TYPE';
import { ContainersService } from '../containers/containers.service';

import { forwardRef, Inject } from '@nestjs/common';
import ModbusRTU from 'modbus-serial';
import { UpdateContainerStatsInput } from '../containers/dto/update-container-stats.input';
import { ENDO_STATUS, statusToColor } from '../endos/entities/endo.entity';
import { CreateSnapshotInput } from '../snapshots/dto/create-snapshot.input';
import { SnapshotsService } from '../snapshots/snapshots.service';
import { RowType } from '../trays/entities/tray.entity';
import { RowAndColInput } from './dto/row-and-col.input';
import { Env } from '../../utils/getEnvPath';

const columnToArduinoIdMapper = getColumnToArduinoIdMapper(
  process.env.NODE_ENV as Env,
);



@Injectable()
export class SerialportsService implements OnModuleInit {
  private readonly logger = new Logger(AppService.name);
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
  ) {}

  async onModuleInit() {
    Object.keys(CONTAINER_TYPE_OBJ).forEach(
      (key) => (this.activeSerialportObj[key] = false),
    ); // make all fale by default

    try {
    
      if (process.env.SHOULD_CONNECT_MODBUS === 'true') {
        await this.modbus.connectRTUBuffered(COM_PORT, { baudRate: 9600 }); // TODO
        console.log('✅ Successfully init modbus');
        await this.settingService.initSetting();
      }
    } catch (error) {
      console.log('❌ error init modbus in serialport.server', error);
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
      
          // Timeout handling
          const timeoutPromise = new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Timeout')), 5000) // 5 seconds timeout
          );
      
          const val = await Promise.race([this.modbus.readInputRegisters(0, 3), timeoutPromise]);
        
          
          if (val) activeSerialportObj[key] = true;
          else activeSerialportObj[key] = false;
        } catch (error) {
          console.error('⚠️ Cannot set container active:', key);
          console.error('Error:', error);
        }

        // modbus can only accepts 1 request at a time, so wait a bit
        await new Promise(resolve => setTimeout(resolve,3000))
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
    const reverseRow = 25 - row; // 9 => 16, 16 => 9
    const calculatedRowNum = row <= 8 ? row : reverseRow;
    // row
    return 99 + row; // 100 => row 1, 115 => row 16
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
      console.log('position',row,position)

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
      console.log('turnLightsOff ',row,col)
      // col
      const arduinoId = columnToArduinoIdMapper[col];
      await this.modbus.setID(arduinoId);

      // row
      const position = this.getReversePosition(row);

      // color
      const color = colorToNumber.off;
      await this.modbus.writeRegister(position, color); // 0 = off

      console.log('turnLightsOff success')
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
    console.log('turnLightsOn',col,row,status)
    await this.writeColor({
      col: col,
      row: row,
      endoStatus: status,
    });
    console.log('turnLightsOn success')
  }

  async blinkLocation({ col, row, status }: RowAndColInput) {
    const blinkSetting = await this.settingService.findByName(
      'trayLocationBlinkingSec',
    );
    const secStr = blinkSetting.value;

    const frequencyInterval = 1000;
    let toBlinkCounter = Number(secStr) / (frequencyInterval / 1000);
    const blinkingInterval = setInterval(() => {
      if (toBlinkCounter <= 0) {
        clearInterval(blinkingInterval);
        this.writeColor({
          // write the last time so it's not dark
          col: col,
          row: row,
          endoStatus: status,
        });
        return; // so it does not move to the next line
      }
      this.writeColor({
        col: col,
        row: row,
        endoStatus: toBlinkCounter % 2 === 0 ? 'drying' : 'being_used', // ฟ้าสลับกับ
      });

      toBlinkCounter--;
    }, frequencyInterval);

    return true;
  }

  containerIsResponding(col: CONTAINER_TYPE_VALUES) {
    return this.activeSerialportObj[col];
  }
}
