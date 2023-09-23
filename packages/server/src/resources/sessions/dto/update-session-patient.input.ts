import { Field, InputType } from '@nestjs/graphql';

// either
// update patientId
// update statusAndEndtime
@InputType()
export class UpdateSessionPatientInput {
  @Field(() => String, { nullable: true })
  id: string;

  @Field(() => String)
  patientHN: string;

  @Field()
  patientUsedEndo: boolean;
}
