import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Session } from '../../sessions/entities/session.entity';

@Entity()
@ObjectType()
export class Patient {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  hosNum: string;

  // sessions
  @OneToMany(() => Session, (session) => session.patient)
  @Field(() => [Session])
  sessions: Session[];
}
