import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Action } from '../../actions/entities/action.entity';
import { Endo } from '../../endos/entities/endo.entity';
import { Patient } from '../../patients/entities/patient.entity';

// relations
// ManyToOne: endoscope, patient
// OneToMany actions

export const SESSION_STATUS_OBJ = {
  ONGOING: 'ongoing',
  COMPLETE: 'complete',
} as const;

export type SESSION_STATUS = 'ongoing' | 'complete';
@ObjectType()
@Entity()
export class Session {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column({ default: SESSION_STATUS_OBJ.ONGOING })
  @Field(() => String)
  status: SESSION_STATUS;

  @Column({ default: false })
  @Field(() => Boolean)
  endoWasExpired: boolean; // no patient data required

  @Column({ default: false })
  @Field(() => Boolean)
  endoWasOutOfOrder: boolean; // no patient data required


  // Endo
  @Column()
  @Field()
  endoId: string;

  @ManyToOne(() => Endo, (endo) => endo.sessions, {
    onDelete: 'CASCADE',
  })
  @Field(() => Endo)
  endo: Endo;

  // Patient
  @Column({ nullable: true })
  @Field({ nullable: true })
  patientId: string;

  @ManyToOne(() => Patient, (patient) => patient.sessions, {
    onDelete: 'CASCADE',
  })
  @Field(() => Patient, { nullable: true })
  patient: Patient;

  // actions
  @OneToMany(() => Action, (action) => action.session, { cascade: true })
  @Field(() => [Action], { nullable: true })
  actions: Action[];

  @Column({ nullable: true })
  @Field({ nullable: true })
  isoEndTime: string;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;
}
