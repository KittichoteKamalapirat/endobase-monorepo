import { Field, ID, ObjectType } from '@nestjs/graphql';

import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Action } from '../../actions/entities/action.entity';

// relations
// OneToMany: actions

@Entity()
@ObjectType()
export class Officer {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  offNum: string;

  // actions
  @OneToMany(() => Action, (action) => action.officer)
  @Field(() => [Action])
  actions: Action[];
}