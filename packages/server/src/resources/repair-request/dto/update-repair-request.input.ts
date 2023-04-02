import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateRepairRequestInput } from './create-repair-request.input';

@InputType()
export class UpdateRepairRequestInput extends PartialType(CreateRepairRequestInput) {
  @Field(() => String)
  id: string;
}
