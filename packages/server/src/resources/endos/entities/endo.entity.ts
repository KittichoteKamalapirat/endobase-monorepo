import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EndoCron } from '../../endo-crons/entities/endo-cron.entity';
import { Session } from '../../sessions/entities/session.entity';
import { Tray } from '../../trays/entities/tray.entity';

export const ENDO_STATUS_OBJ = {
  READY: 'ready',
  EXPIRE_SOON: 'expire_soon',
  BEING_USED: 'being_used',
  EXPIRED: 'expired',
  EXPIRED_AND_OUT: 'expired_and_out',
  LEAK_TEST_FAILED: 'leak_test_failed',
  LEAK_TEST_PASSED: 'leak_test_passed',
  DISINFECTION_PASSED: 'disinfection_passed',
  DISINFECTION_FAILED: 'disinfection_failed',
  DRYING: 'drying',
  NO_ENDO: 'no_endo',
} as const;

export type ENDO_STATUS_KEYS = keyof typeof ENDO_STATUS_OBJ;
export type ENDO_STATUS = typeof ENDO_STATUS_OBJ[ENDO_STATUS_KEYS];

// // export type ENDO_STATUS = keyof typeof ENDO_STATUS_OBJ;

// export type ENDO_STATUS =
//   | 'ready'
//   | 'expire_soon'
//   | 'being_used'
//   | 'expired'
//   | 'expired_and_out' // session created, out to be wash soon
//   | 'leak_test_failed'
//   | 'leak_test_passed'
//   | 'disinfection_failed'
//   | 'disinfection_passed'
//   | 'drying'
//   | 'no_endo';

export const statusToColor = {
  [ENDO_STATUS_OBJ.READY]: 'green',
  [ENDO_STATUS_OBJ.EXPIRE_SOON]: 'orange',
  [ENDO_STATUS_OBJ.BEING_USED]: 'black',
  [ENDO_STATUS_OBJ.EXPIRED]: 'red',
  [ENDO_STATUS_OBJ.EXPIRED_AND_OUT]: 'red',
  [ENDO_STATUS_OBJ.LEAK_TEST_FAILED]: 'black',
  [ENDO_STATUS_OBJ.LEAK_TEST_PASSED]: 'black',
  [ENDO_STATUS_OBJ.DISINFECTION_PASSED]: 'black',
  [ENDO_STATUS_OBJ.DISINFECTION_FAILED]: 'black',
  [ENDO_STATUS_OBJ.DRYING]: 'blue',

  [ENDO_STATUS_OBJ.NO_ENDO]: 'black',
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

  @Column({ unique: true })
  @Field()
  serialNum: string;

  @Column()
  @Field()
  type: string;

  @Column()
  @Field()
  model: string;

  // in minutes
  @Column({ default: '30' })
  @Field(() => Int)
  dryingTime: number;

  // tray
  @Column()
  @Field()
  trayId: string;

  @Field(() => Tray)
  @JoinColumn()
  @OneToOne(() => Tray, (tray) => tray.endo, {
    onDelete: 'CASCADE',
  })
  tray: Tray;

  // session
  @OneToMany(() => Session, (session) => session.endo, { cascade: true })
  @Field(() => [Session])
  sessions: Session[];

  // endoCron
  @OneToMany(() => EndoCron, (endoCrons) => endoCrons.endo, { cascade: true })
  @Field(() => [EndoCron])
  endoCrons: EndoCron[];

  @Column({ default: ENDO_STATUS_OBJ.READY })
  @Field(() => String)
  status: ENDO_STATUS; // TODO is this correct?

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @Column({ default: new Date().toISOString() })
  @Field()
  lastPutBackISO: string;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;
}
