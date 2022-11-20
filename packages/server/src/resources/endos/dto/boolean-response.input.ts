import { Field, ObjectType } from '@nestjs/graphql';
import { FieldError } from '../../../types/field-error';

@ObjectType()
class BooleanResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Boolean, { nullable: true })
  value?: boolean;
}

export default BooleanResponse;
