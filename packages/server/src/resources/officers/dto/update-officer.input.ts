import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateOfficerInput } from './create-officer.input';

@InputType()
export class UpdateOfficerInput extends PartialType(CreateOfficerInput) {
  @Field()
  id: string;
}
