import { Field, InputType, PartialType } from '@nestjs/graphql';
import { SETTING_NAMES } from '../entities/setting.entity';
import { CreateSettingInput } from './create-setting.input';

@InputType()
export class UpdateSettingInput extends PartialType(CreateSettingInput) {
  @Field()
  name: SETTING_NAMES;

  @Field()
  value: string;
}
