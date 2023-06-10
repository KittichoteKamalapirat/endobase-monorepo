import { Field, InputType } from '@nestjs/graphql';
import { OfficerType } from '../entities/officer.entity';

@InputType()
export class CreateOfficerInput {
  @Field(() => String)
  officerNum: string;

  @Field(() => String)
  firstName: string;

  @Field(() => String)
  lastName: string;

  @Field(() => String)
  type: OfficerType;
}
