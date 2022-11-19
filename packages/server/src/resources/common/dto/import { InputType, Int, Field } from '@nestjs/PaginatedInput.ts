import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class PaginatedInput {
  @Field(() => Int, { defaultValue: 1 })
  page: number;

  @Field(() => Int, { defaultValue: 10 })
  limit: number;
}
