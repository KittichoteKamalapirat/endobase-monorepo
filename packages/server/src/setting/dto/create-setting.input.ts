import { Field, InputType } from '@nestjs/graphql';
import { SETTING_TYPE_VALUES } from '../entities/SETTING_TYPE_OBJ';

@InputType()
export class CreateSettingInput {
  @Field()
  name: SETTING_TYPE_VALUES;

  @Field()
  value: string;
}
