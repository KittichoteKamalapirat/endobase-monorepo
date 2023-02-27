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
}
