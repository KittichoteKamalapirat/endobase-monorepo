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

export type RowType =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16;
@Entity()
@ObjectType()
export class Tray {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  // 1,2,3,..., 16 for Songkla
  // 1,2,3,..., 8 for Chonburi
  @Column()
  @Field()
  row: RowType;

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

  @ManyToOne(() => Container, (container) => container.trays, {
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
