import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateActionInput } from './create-action.input';

@InputType()
export class UpdateActionInput extends PartialType(CreateActionInput) {
  @Field(() => String)
  officerNum?: string;
}
