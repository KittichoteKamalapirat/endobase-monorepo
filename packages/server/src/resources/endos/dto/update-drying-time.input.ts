import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateDryingTimeInput {
  @Field()
  endoId: string;

  @Field(() => Int)
  mins: number;
}
