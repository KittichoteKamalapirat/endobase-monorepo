import { CreateContainerInput } from './create-container.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateContainerInput extends PartialType(CreateContainerInput) {
  @Field(() => Int)
  id: number;
}
