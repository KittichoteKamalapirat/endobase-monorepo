import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateOfficerInput {
  @Field(() => String)
  officerNum: string;
}
