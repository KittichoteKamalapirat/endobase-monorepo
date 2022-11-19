import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class IPaginationMetaClass {
  @Field(() => Int)
  totalItems: number;

  @Field(() => Int)
  totalPages: number;

  @Field(() => Int)
  itemCount: number;

  @Field(() => Int)
  itemsPerPage: number;

  @Field(() => Int)
  currentPage: number;
}
