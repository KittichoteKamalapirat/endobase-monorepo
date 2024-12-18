import { Field, InputType, Int } from '@nestjs/graphql';
import { ENDO_STATUS } from '../../endos/entities/endo.entity';
import {
    CONTAINER_TYPE_VALUES
} from '../../../types/CONTAINER_TYPE';
import { RowType } from '../../trays/entities/tray.entity';

@InputType()
export class RowAndColInput {
    @Field(() => String)
    col: CONTAINER_TYPE_VALUES;

    @Field(() => Int)
    row: RowType;

    @Field(() => String)
    status: ENDO_STATUS
}
