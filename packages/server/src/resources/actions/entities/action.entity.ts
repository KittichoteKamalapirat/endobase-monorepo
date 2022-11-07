import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Officer } from '../../officers/entities/officer.entity';
import { Session } from '../../sessions/entities/session.entity';

export type ACTION_TYPE = 'leak_test_and_prewash' | 'disinfect' | 'store';

export const ACTION_TYPE_OBJ = {
  LEAK_TEST_AND_PREWASH: 'leak_test_and_prewash',
  // PREWASH: 'prewash',
  DISINFECT: 'disinfect',
  STORE: 'store',
} as const;

// click "use this endoscope" => create a session
// leak test => create an action (associated to a session by last session with this endoscope)
// leak test => create an action (associated to a session by endoscope with this endoscope)
// click "finish a session"

@Entity()
@ObjectType()
export class Action {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column({ default: true })
  @Field()
  passed: boolean;

  @Column()
  @Field()
  sessionId: string;

  @ManyToOne(() => Session, (session) => session.actions)
  @Field(() => Session)
  session: Session;

  @Column()
  @Field()
  officerId: string;

  @ManyToOne(() => Officer, (officer) => officer.actions)
  @Field(() => Officer)
  officer: Officer;

  @Column()
  @Field()
  type: ACTION_TYPE;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;
}
