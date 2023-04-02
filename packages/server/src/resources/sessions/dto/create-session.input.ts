import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateSessionInput {
  @Field(() => String)
  endoId: string;

  @Field(() => Boolean)
  endoWasExpired: boolean;

  @Field(() => Boolean)
  endoWasOutOfOrder: boolean;

}
