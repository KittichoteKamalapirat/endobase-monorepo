import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Endo } from 'src/resources/endos/entities/endo.entity';
import { Officer } from 'src/resources/officers/entities/officer.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export type REPAIR_REQUEST_SRC =
  | 'leak_test' // รั่วเลยเรียกช่าง (from session page)
  | 'disinfection' // // เฟลเลยเรียกช่าง (from session page)
  | 'wait_repair' // เป็นไรไม่รู้ รอช่างมาดู
  | 'request_repair'; // ช่างเอากล้องไปแล้ว
// if source = request_repair => end status will be out_of_order
// otherwise => end status will be waiting_for_repair
@ObjectType()
@Entity()
export class RepairRequest {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @Column()
  @Field()
  note: string;

  @Column({ nullable: true })
  @Field(() => String)
  source: REPAIR_REQUEST_SRC;

  // relationships
  @Column()
  @Field()
  endoId: string;

  @ManyToOne(() => Endo, (endo) => endo.repairRequests, {
    onDelete: 'CASCADE',
  })
  @Field(() => Endo)
  endo: Endo;

  @Column()
  @Field()
  officerId: string;

  @ManyToOne(() => Officer, (officer) => officer.repairRequests, {
    onDelete: 'CASCADE',
  })
  @Field(() => Officer)
  officer: Officer;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;
}
