import { CreateOfficerInput } from './create-officer.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateOfficerInput extends PartialType(CreateOfficerInput) {
  @Field(() => Int)
  id: number;
}
