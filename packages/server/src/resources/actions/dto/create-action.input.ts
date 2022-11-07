import { Field, InputType } from '@nestjs/graphql';
import { ACTION_TYPE } from '../entities/action.entity';

// session has endoscopeId and patientId already
// which session? => sessionId
// which patient? => inside sessionId (update session''s patientId if first action of the session)
// what kinda of aciton? => type
// which officerId
@InputType()
export class CreateActionInput {
  @Field(() => String)
  sessionId: string;

  @Field(() => String)
  type: ACTION_TYPE;

  @Field(() => Boolean)
  passed: boolean;

  @Field(() => String)
  officerId: string;
}
