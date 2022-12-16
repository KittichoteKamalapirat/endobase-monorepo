import { Field, InputType } from '@nestjs/graphql';
import { ENDO_STATUS } from '../../endos/entities/endo.entity';

@InputType()
export class CreateEndoCronInput {
  @Field()
  endoId: string;

  @Field()
  toBeStatus: ENDO_STATUS;

  @Field()
  isoDate: string;
}
