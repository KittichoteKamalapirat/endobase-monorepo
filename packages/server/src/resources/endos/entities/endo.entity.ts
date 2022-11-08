import { Field, ID, ObjectType } from '@nestjs/graphql';
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
import { Session } from '../../sessions/entities/session.entity';
import { Tray } from '../../trays/entities/tray.entity';

export const ENDO_STATUS_OBJ = {
  READY: 'ready',
  EXPIRE_SOON: 'expire_soon',
  BEING_USED: 'being_used',
  EXPIRED: 'expired',
  LEAK_TEST_FAILED: 'leak_test_failed',
  LEAK_TEST_PASSED: 'leak_test_passed',
  DISINFECTION_PASSED: 'disinfection_passed',
  DISINFECTION_FAILED: 'disinfection_failed',
  DRYING: 'drying',
} as const;

export type ENDO_STATUS =
  | 'ready'
  | 'expire_soon'
  | 'being_used'
  | 'expired'
  | 'leak_test_failed'
  | 'leak_test_passed'
  | 'disinfection_failed'
  | 'disinfection_passed'
  | 'drying';

export const statusToColor = {
  [ENDO_STATUS_OBJ.READY]: 'green',
  [ENDO_STATUS_OBJ.EXPIRE_SOON]: 'orange',
  [ENDO_STATUS_OBJ.BEING_USED]: 'black',
  [ENDO_STATUS_OBJ.EXPIRED]: 'red',
  [ENDO_STATUS_OBJ.LEAK_TEST_FAILED]: 'black',
  [ENDO_STATUS_OBJ.LEAK_TEST_PASSED]: 'black',
  [ENDO_STATUS_OBJ.DISINFECTION_PASSED]: 'black',
  [ENDO_STATUS_OBJ.DISINFECTION_FAILED]: 'black',
  [ENDO_STATUS_OBJ.DRYING]: 'blue',
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
  @Column({ nullable: true })
  @Field()
  trayId: string;

  @Field(() => Tray, { nullable: true })
  @JoinColumn()
  @OneToOne(() => Tray, (tray) => tray.endo, {
    onDelete: 'CASCADE',
  })
  tray: Tray;

  // session
  @OneToMany(() => Session, (session) => session.endo)
  @Field(() => [Session])
  sessions: Session[];

  @Column({ default: ENDO_STATUS_OBJ.READY })
  @Field(() => String)
  status: ENDO_STATUS; // TODO is this correct?

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;
}
