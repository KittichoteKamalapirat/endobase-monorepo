import { Field, InputType, PartialType } from '@nestjs/graphql';
import { SETTING_TYPE_VALUES } from '../entities/SETTING_TYPE_OBJ';

import { CreateSettingInput } from './create-setting.input';

@InputType()
export class UpdateSettingInput extends PartialType(CreateSettingInput) {
  @Field()
  name: SETTING_TYPE_VALUES;

  @Field()
  value: string;
}
