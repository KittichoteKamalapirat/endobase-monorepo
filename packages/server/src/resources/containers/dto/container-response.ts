import { Field, ObjectType } from '@nestjs/graphql';
import { FieldError } from '../../../types/field-error';
import { Container } from '../entities/container.entity';

@ObjectType()
class ContainerResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Container, { nullable: true })
  container?: Container;
}

export default ContainerResponse;
