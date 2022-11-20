import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateEndoInput {
  @Field()
  trayId: string;

  @Field()
  brand: string;

  @Field()
  serialNum: string;

  @Field()
  type: string; // 'Gastro' | 'Uro' | 'ERCP' | 'Colona' | '1';

  @Field()
  model: string;

  @Field(() => Int)
  dryingTime: number;
}
