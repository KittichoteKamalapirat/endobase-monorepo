import { Field, InputType, PartialType } from '@nestjs/graphql';
import { ColType } from '../entities/container.entity';
import { CreateContainerInput } from './create-container.input';

@InputType()
export class UpdateContainerInput extends PartialType(CreateContainerInput) {
  @Field(() => String)
  col: ColType;

  @Field(() => String)
  currTemp: string;

  @Field(() => String)
  currHum: string;
}
