import { CreateOtherActionsInput } from './create-action.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateActionInput extends PartialType(CreateOtherActionsInput) {
  @Field(() => Int)
  id: number;
}
