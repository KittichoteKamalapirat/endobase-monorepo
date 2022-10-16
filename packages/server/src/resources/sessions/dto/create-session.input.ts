import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateSessionInput {
  @Field(() => String, { description: 'For create a session for an endoscope' })
  endoId: string;
}
