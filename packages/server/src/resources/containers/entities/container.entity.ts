import { Field, ID, ObjectType } from '@nestjs/graphql';

import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Snapshot } from '../../snapshots/entities/snapshot.entity';
import { Tray } from '../../trays/entities/tray.entity';

// has many trays, has many snapshots
@Entity()
@ObjectType()
export class Container {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column({ nullable: true })
  @Field()
  col: string;

  @OneToMany(() => Tray, (tray) => tray.container)
  @Field(() => [Tray])
  trays: Tray[];

  @OneToMany(() => Snapshot, (snapshot) => snapshot.container)
  @Field(() => [Snapshot])
  snapshots: Snapshot[];

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;
}
