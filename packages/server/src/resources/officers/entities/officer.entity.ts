import { Field, ID, ObjectType } from '@nestjs/graphql';
import { RepairRequest } from 'src/resources/repair-request/entities/repair-request.entity';

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

@Entity()
@ObjectType()
export class Officer {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column({ unique: true })
  @Field()
  officerNum: string;

  @Column()
  @Field()
  firstName: string;

  @Column()
  @Field()
  lastName: string;

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
