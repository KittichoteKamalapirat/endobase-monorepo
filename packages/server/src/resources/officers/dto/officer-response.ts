import { Field, ObjectType } from '@nestjs/graphql';
import { FieldError } from '../../../types/field-error';
import { Officer } from '../entities/officer.entity';

@ObjectType()
class OfficerResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Officer, { nullable: true })
  officer?: Officer;
}

export default OfficerResponse;
