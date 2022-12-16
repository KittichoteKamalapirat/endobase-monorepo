import { Field, InputType, Int } from '@nestjs/graphql';
import { ENDO_STATUS } from '../../endos/entities/endo.entity';

@InputType()
export class AddScheduleInput {
  @Field()
  endoId: string;

  @Field()
  toBeStatus: ENDO_STATUS;

  @Field(() => Int)
  seconds: number;

  @Field(() => Int, { defaultValue: true })
  saveToDb?: boolean;
}
