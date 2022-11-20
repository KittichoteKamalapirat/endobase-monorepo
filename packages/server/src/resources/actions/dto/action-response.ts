import { Field, ObjectType } from '@nestjs/graphql';
import { FieldError } from '../../../types/field-error';
import { Action } from '../entities/action.entity';

@ObjectType()
class ActionResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Action, { nullable: true })
  action?: Action;
}

export default ActionResponse;
