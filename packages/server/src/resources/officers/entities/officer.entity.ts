import { Field, ID, ObjectType } from '@nestjs/graphql';
import { RepairRequest } from '../../repair-request/entities/repair-request.entity';

import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Action } from '../../actions/entities/action.entity';

// relations
// OneToMany: actions

export type OfficerType = 'hos_officer' | 'endo_technician';

@Entity()
@ObjectType()
export class Officer {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column({ unique: true })
  @Field()
  officerNum: string;

  @Column({ default: "" })
  @Field()
  firstName: string;

  @Column({ default: "" })
  @Field()
  lastName: string;

  @Column({ default: 'hos_officer' })
  @Field(() => String)
  type: OfficerType;

  // actions
  @OneToMany(() => Action, (action) => action.officer, { cascade: true })
  @Field(() => [Action])
  actions: Action[];

  @OneToMany(() => RepairRequest, (rr) => rr.officer, { cascade: true })
  @Field(() => [RepairRequest])
  repairRequests: RepairRequest[];

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;
}
