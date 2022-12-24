import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  Column,
} from 'typeorm';

// setting
export type SETTING_NAMES =
  | 'containerSnapshotIntervalMin'
  | 'humidityThreshold'
  | 'temperatureThreshold'
  | 'trayLocationBlinkingSec';

@ObjectType()
@Entity()
export class Setting {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column({ unique: true })
  @Field(() => String)
  name: SETTING_NAMES;

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
