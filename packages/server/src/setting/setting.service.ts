import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppService } from '../app.service';
import { CreateSettingInput } from './dto/create-setting.input';
import { UpdateSettingInput } from './dto/update-setting.input';
import { Setting, SETTING_NAMES } from './entities/setting.entity';

@Injectable()
export class SettingService {
  private readonly logger = new Logger(AppService.name);
  constructor(
    @InjectRepository(Setting)
    private settingRepository: Repository<Setting>, // use database, make sure forFeature is in module
  ) {}

  create(input: CreateSettingInput) {
    const newSetting = this.settingRepository.create(input);

    console.log('input', input);
    console.log('new setting', newSetting);
    return this.settingRepository.save(newSetting);
  }

  findAll() {
    return this.settingRepository.find();
  }

  findSnapshotIntervalMins() {
    return this.settingRepository.findOne({
      where: { name: 'containerSnapshotIntervalMins' },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} setting`;
  }

  findByName(name: SETTING_NAMES) {
    return this.settingRepository.findOne({ where: { name } });
  }

  async updateByName(input: UpdateSettingInput): Promise<Setting | Error> {
    const setting = await this.findByName(input.name);

    if (!setting) return new Error('Cannot find the setting');

    const updatedSetting = { ...setting, value: input.value };
    return this.settingRepository.save(updatedSetting);
  }
}
