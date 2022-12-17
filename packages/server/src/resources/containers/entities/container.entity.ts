import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CONTAINER_TYPE_VALUES } from '../../../types/CONTAINER_TYPE';
import { Snapshot } from '../../snapshots/entities/snapshot.entity';
import { Tray } from '../../trays/entities/tray.entity';

// has many trays, has many snapshots

@ObjectType()
@Entity()
export class Container {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  // A,B,C,D, ... H (8 for Songkla)
  // A (1 for Chonburi)
  @Column()
  @Field()
  col: CONTAINER_TYPE_VALUES;

  @Column({ default: '0.0' })
  @Field()
  currTemp: string;

  @Column({ default: '0.0' })
  @Field()
  currHum: string;

  @Column({ default: 'true' })
  @Field()
  lightsAreOn: boolean;

  @OneToMany(() => Tray, (tray) => tray.container, { cascade: true })
  @Field(() => [Tray])
  trays: Tray[];

  @OneToMany(() => Snapshot, (snapshot) => snapshot.container, {
    cascade: true,
  })
  @Field(() => [Snapshot])
  snapshots: Snapshot[];

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;
}
