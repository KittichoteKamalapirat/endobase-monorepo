import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Container } from '../../containers/entities/container.entity';
import { Endo } from '../../endos/entities/endo.entity';
@Entity()
@ObjectType()
export class Tray {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: number;

  @Column()
  @Field()
  row: number;

  // endo
  @Field(() => Endo, { nullable: true })
  @OneToOne(() => Endo, (endo) => endo.tray, {
    cascade: true,
  })
  endo: Endo;

  // container
  @Column()
  @Field()
  containerId: string;

  @ManyToOne(() => Container, (container) => container.trays)
  @Field(() => Container)
  container: Container;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;
}
