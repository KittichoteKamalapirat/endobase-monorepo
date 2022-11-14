import { ObjectType, Field } from '@nestjs/graphql';
import { User } from '../entities/user.entity';
import { FieldError } from '../../../types/field-error';

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

export default UserResponse;
