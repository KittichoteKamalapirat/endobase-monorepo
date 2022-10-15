import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateContainerInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
