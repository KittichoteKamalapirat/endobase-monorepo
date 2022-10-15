import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Tray } from '../trays/entities/tray.entity';

export const ENDO_STATUS = {
  READY: 'ready',
  EXPIRE_SOON: 'expire_soon',
  BEING_USED: 'being_used',
  EXPIRED: 'expired',
  PREWASHED: 'prewashed',
  LEAK_TEST_FAILED: 'leak_test_failed',
  LEAK_TEST_PASSED: 'leak_test_passed',
  DISINFECTED: 'disinfected',
  DRYING: 'drying',
} as const;

export const statusToColor = {
  [ENDO_STATUS.READY]: 'green',
  [ENDO_STATUS.EXPIRE_SOON]: 'orange',
  [ENDO_STATUS.BEING_USED]: 'black',
  [ENDO_STATUS.EXPIRED]: 'red',
  [ENDO_STATUS.PREWASHED]: 'black',
  [ENDO_STATUS.LEAK_TEST_FAILED]: 'black',
  [ENDO_STATUS.LEAK_TEST_PASSED]: 'black',
  [ENDO_STATUS.DISINFECTED]: 'black',
  [ENDO_STATUS.DRYING]: 'blue',
};
@ObjectType()
@Entity()
export class Endo {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  brand: string;

  @Column()
  @Field()
  type: string;

  @Column()
  @Field()
  model: string;

  // tray
  @Column()
  @Field()
  trayId: string;

  @Column({ default: ENDO_STATUS.READY })
  @Field(() => String)
  status: string; // TODO is this correct?

  @OneToOne(() => Tray, (tray) => tray.endo, {
    onDelete: 'CASCADE',
  })
  @Field(() => Tray)
  @JoinColumn()
  tray: Tray;
}
