import { Injectable, Logger } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppService } from '../app.service';
import { CreateSettingInput } from './dto/create-setting.input';
import { UpdateSettingInput } from './dto/update-setting.input';
import { Setting } from './entities/setting.entity';
import { SETTING_TYPE_VALUES } from './entities/SETTING_TYPE_OBJ';

@Injectable()
export class SettingService {
  private readonly logger = new Logger(AppService.name);
  public counterCeil = Infinity;
  private allSettings = {} as { [key in SETTING_TYPE_VALUES]: Setting };

  // public configSetting: { [key: string]: string } = {}

  constructor(
    @InjectRepository(Setting)
    private settingRepository: Repository<Setting>, // use database, make sure forFeature is in module
  ) {}

  async initSetting() {
    const settings = await this.findAll();
    settings.forEach((setting) => {
      const key = setting.name;
      this.allSettings[key] = setting;
    });

    return true;
  }

  getSetting() {
    return this.allSettings;
  }

  create(input: CreateSettingInput) {
    const newSetting = this.settingRepository.create(input);

    return this.settingRepository.save(newSetting);
  }

  findAll() {
    return this.settingRepository.find();
  }

  async findSnapshotIntervalMins() {
    return this.settingRepository.findOne({
      where: { name: 'containerSnapshotIntervalMin' },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} setting`;
  }

  findByName(name: SETTING_TYPE_VALUES) {
    return this.settingRepository.findOne({ where: { name } });
  }

  async updateByName(input: UpdateSettingInput): Promise<Setting | Error> {
    const setting = await this.settingRepository.findOne({
      where: { name: input.name },
    });

    if (!setting) return new Error('Cannot find the setting');

    const updatedSettingInput = { ...setting, value: input.value }; // make sure the is not relation nested in ...setting
    const updatedSetting = await this.settingRepository.save(
      updatedSettingInput,
    );

    // re init setting
    await this.initSetting();
    return updatedSetting;
  }

  // for admin
  async removeAllRows() {
    try {
      const setting = await this.findAll();

      await Promise.all(
        setting.map((setting) =>
          this.settingRepository.delete({ id: setting.id }),
        ),
      );
    } catch (error) {
      console.error('error remove settings', error);
    }
  }

  async populateRows() {
    try {
      const input1 = {
        name: 'humidityThreshold' as SETTING_TYPE_VALUES,
        value: '30',
        label: 'Humidity Threshold Alert',
        description:
          'เปิดการแจ้งเตือนหากความชื้นในตู้เก็บเกินค่าที่ตั้งไว้ (เช่น เกิน 35)',
      };

      const newRow1 = this.settingRepository.create(input1);
      await this.settingRepository.save(newRow1);

      const input2 = {
        name: 'temperatureThreshold' as SETTING_TYPE_VALUES,
        value: '30',
        label: 'Temperature Threshold Alert',
        description:
          'เปิดการแจ้งเตือนหากอุณหภูมิในตู้เก็บเกินค่าที่ตั้งไว้ (เช่น เกิน 35)',
      };

      const newRow2 = this.settingRepository.create(input2);
      await this.settingRepository.save(newRow2);

      const input3 = {
        name: 'hospitalName' as SETTING_TYPE_VALUES,
        value: process.env.HOSPITAL_NAME,
        label: 'Institution Name',
        description: 'ชื่อสำหรับแสดงที่หน้าโฮม',
      };

      const newRow3 = this.settingRepository.create(input3);
      await this.settingRepository.save(newRow3);

      const input4 = {
        name: 'trayLocationBlinkingSec' as SETTING_TYPE_VALUES,
        value: '10',
        label: 'Tray Location Blinking Second',
        description:
          'ระยะเวลาเพื่อแสดงไฟกะพริบ ณ ตำแหน่งของถาดเก็บ หน่วยเป็นวินาที (เช่น 10 วินาที)',
      };

      const newRow4 = this.settingRepository.create(input4);
      await this.settingRepository.save(newRow4);
      return true;
    } catch (error) {
      console.error('error populating users', error);
    }
  }
}
