import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateSnapshotInput {
  @Field(() => String)
  systemStatus: string;

  @Field(() => String)
  hum: string;

  @Field(() => String)
  temp: string;

  @Field(() => String)
  containerId: string;
}
