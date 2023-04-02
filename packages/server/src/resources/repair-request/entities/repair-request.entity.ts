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
