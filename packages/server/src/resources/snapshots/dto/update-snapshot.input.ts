import { CreateSnapshotInput } from './create-snapshot.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateSnapshotInput extends PartialType(CreateSnapshotInput) {
  @Field(() => Int)
  id: number;
}
