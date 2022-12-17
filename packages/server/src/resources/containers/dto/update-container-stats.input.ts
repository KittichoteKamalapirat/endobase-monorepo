import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CONTAINER_TYPE_VALUES } from '../../../types/CONTAINER_TYPE';

import { CreateContainerInput } from './create-container.input';

@InputType()
export class UpdateContainerStatsInput extends PartialType(
  CreateContainerInput,
) {
  @Field(() => String)
  col: CONTAINER_TYPE_VALUES;

  @Field(() => String)
  currTemp: string;

  @Field(() => String)
  currHum: string;
}
