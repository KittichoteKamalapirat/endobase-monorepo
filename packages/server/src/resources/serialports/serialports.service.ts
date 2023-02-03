import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Cron, CronExpression, Timeout } from '@nestjs/schedule';
import { AppService } from '../../app.service';
import { colorToNumber, columnToArduinoIdMapper, COM_PORT } from '../../constants';
import { SettingService } from '../../setting/setting.service';
import {
  containerTypeOptions,
  CONTAINER_TYPE_OBJ,
  CONTAINER_TYPE_VALUES
} from '../../types/CONTAINER_TYPE';
import { ContainersService } from '../containers/containers.service';

import ModbusRTU from "modbus-serial";
import { ENDO_STATUS, statusToColor } from '../endos/entities/endo.entity';
import { CreateSnapshotInput } from '../snapshots/dto/create-snapshot.input';
import { SnapshotsService } from '../snapshots/snapshots.service';
import { RowType } from '../trays/entities/tray.entity';
import { RowAndColInput } from './dto/row-and-col.input';
import { forwardRef, Inject } from '@nestjs/common';

@Injectable()
export class SerialportsService implements OnModuleInit {
  private readonly logger = new Logger(AppService.name);
  private modbus = new ModbusRTU();

  // active serialport means those that are responding
  private activeSerialportObj = {} as { [key in CONTAINER_TYPE_VALUES]: boolean }

  constructor(
    private snapshotsService: SnapshotsService,
    @Inject(forwardRef(() => ContainersService))
    private containersService: ContainersService,
    private settingService: SettingService,
  ) {

  }

  async onModuleInit() {
    await this.modbus.connectRTUBuffered(COM_PORT, { baudRate: 9600 });

    await this.settingService.initSetting()


    // event listener on controller return
    containerTypeOptions.forEach((option) => {
      const col = option.value;


    });

  }

  getActiveSerialports() {
    return this.activeSerialportObj
  }




  @Timeout(1000)
  // @Cron(CronExpression.EVERY_SECOND)
  async setActiveSerialport() {
    const syncSetActiveSerialport = async () => {
      const activeSerialportObj = {};
      for (let key of Object.keys(CONTAINER_TYPE_OBJ)) {
        console.log(1);

        const arduinoId = columnToArduinoIdMapper[key]
        console.log(2);

        await this.modbus.setID(arduinoId);
        console.log(3);

        await this.modbus.writeRegister(100, 3)
        console.log(4);

        const val = await this.modbus.readInputRegisters(0, 3);
        console.log(5);

        if (val) activeSerialportObj[key] = true
        else activeSerialportObj[key] = false
      }
      return activeSerialportObj;
    }
    try {
      const activeSerialportObj = await syncSetActiveSerialport() as Record<CONTAINER_TYPE_VALUES, boolean>
      this.activeSerialportObj = activeSerialportObj
      console.log(this.activeSerialportObj);
    } catch (error) {
      console.log(error);
    }


  }




  @Timeout(5000) // wait a bit for modbus to connect
  @Cron(CronExpression.EVERY_HOUR)
  async createSnapshotCron() {
    console.log(111111111);

    const syncCreateSnapshots = async () => {
      // do not return anything inside a loop => exit immediately
      // If I need any data => create empty array and push or reassign
      for (let key of Object.keys(CONTAINER_TYPE_OBJ)) {
        const arduinoId = columnToArduinoIdMapper[key]

        console.log('id', arduinoId);


        this.modbus.setID(arduinoId);

        const container = await this.containersService.findOneByContainerChar(
          key as CONTAINER_TYPE_VALUES,
        );
        console.log('container', container);


        const val = await this.modbus.readInputRegisters(0, 3); // read 3 registers starting from  at address 0 (first register)
        console.log('value', val);

        const systemStatus = String(val.data[0]);
        const temp = String(val.data[1] / 10)
        const hum = String(val.data[2] / 10);


        console.log('status', systemStatus);

        const input: CreateSnapshotInput = {
          systemStatus,
          temp,
          hum,
          containerId: container.id,
        };
        const newSnapshot = await this.snapshotsService.create(input);
        console.log('new snapshot', newSnapshot);


      }
    }
    try {
      console.log('start');

      await syncCreateSnapshots()

      console.log('end');

      // const newSnapshots = await Promise.all(Object.keys(CONTAINER_TYPE_OBJ).map(async (key) => {
      //   const arduinoId = columnToArduinoIdMapper[key]

      //   await this.modbus.setID(arduinoId);

      //   const container = await this.containersService.findOneByContainerChar(
      //     key as CONTAINER_TYPE_VALUES,
      //   );
      //   console.log('container', container);


      //   const val = await this.modbus.readInputRegisters(0, 3); // read 3 registers starting from  at address 0 (first register)
      //   console.log('value', val);

      //   const systemStatus = String(val.data[0]);
      //   const temp = String(val.data[1] / 10)
      //   const hum = String(val.data[2] / 10);


      //   console.log('status', systemStatus);


      //   const input: CreateSnapshotInput = {
      //     systemStatus,
      //     temp,
      //     hum,
      //     containerId: container.id,
      //   };
      //   const newSnapshot = await this.snapshotsService.create(input);
      //   return newSnapshot


      // }));
      // console.log(newSnapshots);

      // return newSnapshots
    } catch (error) {
      console.log(error);

    }


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
      const arduinoId = columnToArduinoIdMapper[col]
      await this.modbus.setID(arduinoId)

      // row
      const position = 99 + row // 100 => row 1, 115 => row 16

      // color
      const color = statusToColor[endoStatus]

      await this.modbus.writeRegister(position, color) // 0 = off
      return true
    } catch (error) {
      return false
    }
  }


  async turnLightsOff({ col, row }: { col: CONTAINER_TYPE_VALUES; row: RowType }) {
    try {
      // col
      const arduinoId = columnToArduinoIdMapper[col]
      await this.modbus.setID(arduinoId)

      // row
      const position = 99 + row // 100 => row 1, 115 => row 16

      // color
      const color = colorToNumber.off
      await this.modbus.writeRegister(position, color) // 0 = off

      return true
    } catch (error) {
      return false
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
        endoStatus: toBlinkCounter % 2 === 0 ? status : "being_used", // ดำสลับกับสี
      });

      toBlinkCounter--
    }, frequencyInterval);

    return true
  }


  containerIsResponding(col: CONTAINER_TYPE_VALUES) {
    return this.activeSerialportObj[col];
  }
}
