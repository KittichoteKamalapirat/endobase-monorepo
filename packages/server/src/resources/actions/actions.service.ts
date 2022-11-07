import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateActionInput } from './dto/create-action.input';
import { UpdateActionInput } from './dto/update-action.input';
import { Action } from './entities/action.entity';

@Injectable()
export class ActionsService {
  constructor(
    @InjectRepository(Action)
    private actionsRepository: Repository<Action>, // use database, make sure forFeature is in module
  ) {}

  create(createActionInput: CreateActionInput) {
    const newAction = this.actionsRepository.create(createActionInput);
    return this.actionsRepository.save(newAction);
  }

  findAll() {
    return `This action returns all actions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} action`;
  }

  update(id: number, updateActionInput: UpdateActionInput) {
    return `This action updates a #${id} action`;
  }

  remove(id: number) {
    return `This action removes a #${id} action`;
  }
}
