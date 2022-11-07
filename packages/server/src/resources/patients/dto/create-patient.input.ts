import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreatePatientInput {
  @Field(() => String, { description: 'Example field (placeholder)' })
  hosNum: string;
}
