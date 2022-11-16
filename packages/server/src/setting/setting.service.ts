import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppService } from '../app.service';
import { DEFAULT_SNAPSHOT_INTERVAL_MINS } from '../constants';
import { CreateSettingInput } from './dto/create-setting.input';
import { UpdateSettingInput } from './dto/update-setting.input';
import { Setting, SETTING_NAMES } from './entities/setting.entity';

@Injectable()
export class SettingService {
  private readonly logger = new Logger(AppService.name);
  private SNAPSHOT_INTERVAL_MINS = DEFAULT_SNAPSHOT_INTERVAL_MINS;
  constructor(
    @InjectRepository(Setting)
    private settingRepository: Repository<Setting>, // use database, make sure forFeature is in module
  ) {}

  // for serialports to use
  getSnapshotInterval() {
    return this.SNAPSHOT_INTERVAL_MINS;
  }

  setSnapshotInterval(mins: number) {
    this.SNAPSHOT_INTERVAL_MINS = mins;
    return this.SNAPSHOT_INTERVAL_MINS;
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

    const updatedSettingInput = { ...setting, value: input.value };
    const updatedSetting = await this.settingRepository.save(
      updatedSettingInput,
    );

    // update for serialports
    if (setting.name === 'containerSnapshotIntervalMins')
      this.setSnapshotInterval(parseInt(updatedSetting.value));

    return updatedSetting;
  }
}
