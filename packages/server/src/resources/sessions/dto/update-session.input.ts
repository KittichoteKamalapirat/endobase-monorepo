import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateSessionInput } from './create-session.input';

// either
// update patientId
// update statusAndEndtime
@InputType()
export class UpdateSessionInput extends PartialType(CreateSessionInput) {
  @Field(() => String, { nullable: true })
  id: string;

  @Field(() => String, { nullable: true })
  status?: string;

  @Field(() => String, { nullable: true })
  patientHN?: string;

  @Field(() => String, { nullable: true })
  endTime?: string;
}
