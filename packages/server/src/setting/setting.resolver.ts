import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SettingService } from './setting.service';
import { Setting } from './entities/setting.entity';
import { CreateSettingInput } from './dto/create-setting.input';
import { UpdateSettingInput } from './dto/update-setting.input';

@Resolver(() => Setting)
export class SettingResolver {
  constructor(private readonly settingService: SettingService) {}

  @Mutation(() => Setting)
  createSetting(@Args('input') input: CreateSettingInput) {
    return this.settingService.create(input);
  }

  @Query(() => [Setting], { name: 'settings' })
  findAll() {
    return this.settingService.findAll();
  }

  @Query(() => Setting, { name: 'snapshotIntervalMins' })
  findSnapshotIntervalMins() {
    return this.settingService.findSnapshotIntervalMins();
  }

  @Query(() => Setting, { name: 'setting' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.settingService.findOne(id);
  }

  @Mutation(() => Setting)
  updateSetting(@Args('input') input: UpdateSettingInput) {
    return this.settingService.updateByName(input);
  }
}
