import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateTrayInput {
  @Field(() => String)
  containerId: string;

  @Field(() => Int, { description: 'row inside a container' })
  row: number;
}
