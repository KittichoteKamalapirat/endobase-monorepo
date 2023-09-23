import { Field, InputType } from '@nestjs/graphql';
import { REPAIR_REQUEST_SRC } from '../entities/repair-request.entity';

@InputType()
export class CreateRepairRequestInput {
  @Field(() => String)
  endoId: string;

  @Field(() => String)
  note: string;

  @Field(() => String)
  officerNum: string;

  @Field(() => String)
  source: REPAIR_REQUEST_SRC;

  @Field(() => String)
  toBeEndoStatus: 'waiting_for_repair' | 'out_of_order';
}
