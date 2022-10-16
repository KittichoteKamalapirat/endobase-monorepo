import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateOfficerInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
