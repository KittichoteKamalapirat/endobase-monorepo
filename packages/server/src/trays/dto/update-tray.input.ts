import { CreateTrayInput } from './create-tray.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTrayInput extends PartialType(CreateTrayInput) {
  @Field(() => Int)
  id: number;
}
