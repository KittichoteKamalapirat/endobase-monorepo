import { Field, InputType } from '@nestjs/graphql';
import { ACTION_TYPE } from '../entities/action.entity';

// session has endoscopeId and patientId already
// which session? => sessionId
// which patient? => inside sessionId (update session''s patientId if first action of the session)
// what kinda of aciton? => type
// which officerId

type FailedFeedback =
  | 'bring_to_washing_room'
  | 're_leak_test'
  | 're_disinfection'
  | 'wait_repair';

@InputType()
export class CreateActionInput {
  @Field(() => String)
  sessionId: string;

  @Field(() => String)
  type: ACTION_TYPE;

  // for leak test and disinfection
  @Field(() => String, { nullable: true })
  failedFeedback?: FailedFeedback;

  @Field(() => Boolean, { nullable: true })
  passed?: boolean;

  @Field(() => String)
  officerNum: string;

  @Field(() => String, { nullable: true })
  note?: string;
}
