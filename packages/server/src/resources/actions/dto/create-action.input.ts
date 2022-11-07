import { InputType, Int, Field } from '@nestjs/graphql';

// session has endoscopeId and patientId already
// which session? => sessionId
// which patient? => inside sessionId (update session''s patientId if first action of the session)
// what kinda of aciton? => type
// which officerId
@InputType()
export class CreateLeakTestActionInput {
  @Field(() => String)
  sessionId: string;

  @Field(() => String)
  patientId: string;

  @Field(() => String)
  officerId: string;
}

@InputType()
export class CreateOtherActionsInput {
  @Field(() => String)
  sessionId: string;

  @Field(() => String)
  type: string;

  @Field(() => String)
  officerId: string;
}
