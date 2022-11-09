import { InputType, Int, Field } from '@nestjs/graphql';
import { RowType } from '../entities/tray.entity';

@InputType()
export class CreateTrayInput {
  @Field(() => String)
  containerId: string;

  @Field(() => Int, { description: 'row inside a container' })
  row: RowType;
}
