import { Field, ObjectType } from '@nestjs/graphql';
import { IPaginationMeta } from 'nestjs-typeorm-paginate';
import { IPaginationMetaClass } from '../../common/dto/IPaginationMetaClass';
import { Snapshot } from '../entities/snapshot.entity';

@ObjectType()
export class PaginatedSnapshotOutput {
  @Field(() => [Snapshot])
  items: Snapshot[];

  @Field(() => IPaginationMetaClass)
  meta: IPaginationMeta;
}
