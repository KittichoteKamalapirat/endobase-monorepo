import { Field, InputType } from '@nestjs/graphql';
import { SETTING_NAMES } from '../entities/setting.entity';

@InputType()
export class CreateSettingInput {
  @Field()
  name: SETTING_NAMES;

  @Field()
  value: string;
}
