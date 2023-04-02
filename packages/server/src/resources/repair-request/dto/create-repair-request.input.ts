import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateRepairRequestInput {
  @Field(() => String)
  endoId: string;

  @Field(() => String)
  note: string;

  @Field(() => String)
  officerNum: string;
}
