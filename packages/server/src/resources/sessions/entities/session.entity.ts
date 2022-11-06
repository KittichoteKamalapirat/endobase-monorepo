import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Action } from '../../actions/entities/action.entity';
import { Endo } from '../../endos/entities/endo.entity';
import { Patient } from '../../patients/entities/patient.entity';

// relations
// ManyToOne: endoscope, patient
// OneToMany actions

export const SESSION_STATUS = {
  ONGOING: 'ongoing',
  COMPLETE: 'complete',
} as const;

// type SESSION_STATUS = 'ongoing' | 'complete';
@ObjectType()
@Entity()
export class Session {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column({ default: SESSION_STATUS.ONGOING })
  @Field(() => String)
  status: string;

  // Endo
  @Column()
  @Field()
  endoId: string;

  @ManyToOne(() => Endo, (endo) => endo.sessions)
  @Field(() => Endo)
  endo: Endo;

  // Patient
  @Column({ nullable: true })
  @Field()
  patientId: string;

  @ManyToOne(() => Patient, (patient) => patient.sessions)
  @Field(() => Patient)
  patient: Patient;

  // actions
  @OneToMany(() => Action, (action) => action.session)
  @Field(() => [Action])
  actions: Action[];
}
