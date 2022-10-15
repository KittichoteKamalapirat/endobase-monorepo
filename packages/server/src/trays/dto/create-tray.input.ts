import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateTrayInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
