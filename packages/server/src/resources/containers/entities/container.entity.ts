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

export type ColType = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H';
// has many trays, has many snapshots
@Entity()
@ObjectType()
export class Container {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  // A,B,C,D, ... H (8 for Songkla)
  // A (1 for Chonburi)
  @Column()
  @Field()
  col: ColType;

  @Column({ default: '0.0' })
  @Field()
  currTemp: string;

  @Column({ default: '0.0' })
  @Field()
  currHum: string;

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
