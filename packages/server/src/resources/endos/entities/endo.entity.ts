import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { RepairRequest } from 'src/resources/repair-request/entities/repair-request.entity';
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
  taken_out: "taken_out",
  BEING_USED: 'being_used',
  IN_WASHING_ROOM: 'in_washing_room',
  EXPIRED: 'expired',
  EXPIRED_AND_OUT: 'expired_and_out', // just for the frontend to know to display wash
  LEAK_TEST_FAILED: 'leak_test_failed',
  LEAK_TEST_PASSED: 'leak_test_passed',
  DISINFECTION_PASSED: 'disinfection_passed',
  DISINFECTION_FAILED: 'disinfection_failed',
  DRYING: 'drying',
  NO_ENDO: 'no_endo', // No endo in a tray (for writing color)
  OUT_OF_ORDER: "out_of_order",
  FIXED: "fixed",
  FIXED_AND_OUT: "fixed_and_out", // for "take out and wash"
} as const;

export type ENDO_STATUS_KEYS = keyof typeof ENDO_STATUS_OBJ;
export type ENDO_STATUS = (typeof ENDO_STATUS_OBJ)[ENDO_STATUS_KEYS];

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

export const statusToColor: Record<ENDO_STATUS, number> = {
  [ENDO_STATUS_OBJ.READY]: 2, // green
  [ENDO_STATUS_OBJ.EXPIRE_SOON]: 3, // yellow
  [ENDO_STATUS_OBJ.taken_out]: 0, // off
  [ENDO_STATUS_OBJ.BEING_USED]: 0, // off
  [ENDO_STATUS_OBJ.IN_WASHING_ROOM]: 0, // off
  [ENDO_STATUS_OBJ.EXPIRED]: 1, // red
  [ENDO_STATUS_OBJ.EXPIRED_AND_OUT]: 1, // red
  [ENDO_STATUS_OBJ.LEAK_TEST_FAILED]: 0,
  [ENDO_STATUS_OBJ.LEAK_TEST_PASSED]: 0,
  [ENDO_STATUS_OBJ.DISINFECTION_PASSED]: 0,
  [ENDO_STATUS_OBJ.DISINFECTION_FAILED]: 0,
  [ENDO_STATUS_OBJ.DRYING]: 4, // blue
  [ENDO_STATUS_OBJ.NO_ENDO]: 0,
  [ENDO_STATUS_OBJ.OUT_OF_ORDER]: 7, // white
  [ENDO_STATUS_OBJ.FIXED]: 5, // pink
  [ENDO_STATUS_OBJ.FIXED_AND_OUT]: 5,
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


  @OneToMany(() => RepairRequest, (rr) => rr.endo, { cascade: true })
  @Field(() => [RepairRequest], { nullable: true })
  repairRequests: RepairRequest[];



  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  @Field()
  lastPutBackISO: string;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;
}
