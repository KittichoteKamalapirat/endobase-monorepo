import { CreateEndoCronInput } from './create-endo-cron.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateEndoCronInput extends PartialType(CreateEndoCronInput) {
  @Field(() => Int)
  id: number;
}
