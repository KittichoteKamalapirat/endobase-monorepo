import { Field, InputType, PartialType } from '@nestjs/graphql';
import { SESSION_STATUS } from '../entities/session.entity';
import { CreateSessionInput } from './create-session.input';

// either
// update patientId
// update statusAndEndtime
@InputType()
export class UpdateSessionInput extends PartialType(CreateSessionInput) {
  @Field(() => String, { nullable: true })
  id: string;

  @Field(() => String, { nullable: true })
  status?: SESSION_STATUS;

  @Field(() => String, { nullable: true })
  patientHN?: string;

  @Field(() => String, { nullable: true })
  endTime?: string;
}
