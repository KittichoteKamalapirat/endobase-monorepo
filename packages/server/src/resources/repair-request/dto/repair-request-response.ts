import { Field, ObjectType } from '@nestjs/graphql';

import { FieldError } from '../../../types/field-error';
import { RepairRequest } from '../entities/repair-request.entity';

@ObjectType()
class RepairRequestResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => RepairRequest, { nullable: true })
  repairRequest?: RepairRequest;
}

export default RepairRequestResponse;
