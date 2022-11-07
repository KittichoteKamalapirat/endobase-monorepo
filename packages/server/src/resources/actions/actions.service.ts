import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SessionsService } from '../sessions/sessions.service';
import {
  CreateLeakTestActionInput,
  CreateOtherActionsInput,
} from './dto/create-action.input';
import { UpdateActionInput } from './dto/update-action.input';
import { Action, ACTION_TYPE } from './entities/action.entity';

@Injectable()
export class ActionsService {
  constructor(
    @InjectRepository(Action)
    private actionsRepository: Repository<Action>, // use database, make sure forFeature is in module
    private sessionsService: SessionsService,
  ) {}

  createLeakTestAction(createActionInput: CreateLeakTestActionInput) {
    const { sessionId, patientId, officerId } = createActionInput;
    const input = {
      sessionId,
      officerId,
      type: ACTION_TYPE.LEAK_TEST_AND_PREWASH,
    };

    // this.endosService; // TODO
    const newAction = this.actionsRepository.create(input);
    return this.actionsRepository.save(newAction);
  }

  createDisinfectAction(input: CreateOtherActionsInput) {
    const newAction = this.actionsRepository.create(input);
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
