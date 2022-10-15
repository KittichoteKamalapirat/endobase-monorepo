import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateEndoInput {
  @Field()
  trayId: string;

  @Field()
  brand: string;

  @Field()
  type: string; // 'Gastro' | 'Uro' | 'ERCP' | 'Colona' | '1';

  @Field()
  model: string;
}
