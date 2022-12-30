import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  Column,
} from 'typeorm';
import { SETTING_TYPE_VALUES } from './SETTING_TYPE_OBJ';

// setting


@ObjectType()
@Entity()
export class Setting {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column({ unique: true })
  @Field(() => String)
  name: SETTING_TYPE_VALUES;

  @Column({ unique: true })
  @Field(() => String)
  label: string;

  @Column()
  @Field(() => String)
  description: string;

  @Column()
  @Field(() => String)
  value: string;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;
}
