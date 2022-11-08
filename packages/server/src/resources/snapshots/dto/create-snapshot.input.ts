import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateSnapshotInput {
  @Field(() => Int)
  systemStatus: number;

  @Field(() => String)
  hum: string;

  @Field(() => String)
  temp: string;

  @Field(() => String)
  containerId: string;
}
