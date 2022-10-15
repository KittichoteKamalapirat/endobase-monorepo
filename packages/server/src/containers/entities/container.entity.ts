import { Field, ID, ObjectType } from '@nestjs/graphql';

import { Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Tray } from '../../trays/entities/tray.entity';

@Entity()
@ObjectType()
export class Container {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @OneToMany(() => Tray, (tray) => tray.container)
  @Field(() => [Tray])
  trays: Tray[];
}