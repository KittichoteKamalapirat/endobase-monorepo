import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Endo, ENDO_STATUS } from '../../endos/entities/endo.entity';

@Entity()
@ObjectType()
export class EndoCron {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  endoId: string;

  @Column()
  @Field()
  toBeStatus: ENDO_STATUS;

  @Column()
  @Field()
  isoDate: string;

  // relations
  @ManyToOne(() => Endo, (endo) => endo.endoCrons, {
    onDelete: 'CASCADE',
  })
  @Field(() => Endo)
  endo: Endo;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;
}
