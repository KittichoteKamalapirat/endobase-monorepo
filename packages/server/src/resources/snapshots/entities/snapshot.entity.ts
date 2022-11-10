import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Container } from '../../containers/entities/container.entity';

// relations
// ManyToOne: container

@ObjectType()
@Entity()
export class Snapshot {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  hum: string;

  @Column()
  @Field()
  temp: string;

  @Column()
  @Field()
  systemStatus: string;

  @Column()
  @Field()
  containerId: string;

  @ManyToOne(() => Container, (container) => container.snapshots, {
    onDelete: 'CASCADE',
  })
  @Field(() => Container)
  container: Container;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;
}
