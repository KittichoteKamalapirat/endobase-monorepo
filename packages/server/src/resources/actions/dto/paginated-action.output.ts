import { Field, ObjectType } from '@nestjs/graphql';
import { IPaginationMeta } from 'nestjs-typeorm-paginate';
import { IPaginationMetaClass } from '../../common/dto/IPaginationMetaClass';
import { Action } from '../entities/action.entity';

@ObjectType()
export class PaginatedActionOutput {
  @Field(() => [Action])
  items: Action[];

  @Field(() => IPaginationMetaClass)
  meta: IPaginationMeta;
}
