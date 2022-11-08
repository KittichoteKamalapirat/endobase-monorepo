import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { isBuffer } from 'util';
import { EndosService } from '../endos/endos.service';
import { ENDO_STATUS_OBJ } from '../endos/entities/endo.entity';
import { Officer } from '../officers/entities/officer.entity';
import { OfficersService } from '../officers/officers.service';
import { SessionsService } from '../sessions/sessions.service';
import { CreateActionInput } from './dto/create-action.input';
import { UpdateActionInput } from './dto/update-action.input';
import { Action, ACTION_TYPE_OBJ } from './entities/action.entity';

@Injectable()
export class ActionsService {
  constructor(
    @InjectRepository(Action)
    private actionsRepository: Repository<Action>, // use database, make sure forFeature is in module
    private officersService: OfficersService,
    private sessionsService: SessionsService,
    private endosService: EndosService,
  ) {}

  // if therre is existing officer (with the officerNum), use it
  // otherwise, create one!

  // if type = leak test or disinfect, have to update endo status
  // if type = store, have to update endo status, end session
  async create(input: CreateActionInput) {
    // make sure, an action is not already created
    const action = await this.actionsRepository.findOneBy({
      sessionId: input.sessionId,
      type: input.type,
      passed: input.passed,
    });

    console.log('action', action);
    // can only pass 1 time
    // but can fail many times
    if (action && input.passed)
      return new Error(`${input.type} has already been completed`);

    const existingOfficer = await this.officersService.findOneByofficerNum(
      input.officerNum,
    );

    let officer: Officer | null = null;
    if (!existingOfficer) {
      officer = await this.officersService.create({
        officerNum: input.officerNum,
      });
    } else {
      officer = existingOfficer;
    }

    const actionInput = {
      sessionId: input.sessionId,
      type: input.type,
      passed: input.passed,
      officerId: officer.id,
    };

    // find session to get the endoId

    const session = await this.sessionsService.findOne(input.sessionId);
    if (!session) return new Error('Cannot find a session');
    // update endo status
    switch (input.type) {
      case ACTION_TYPE_OBJ.LEAK_TEST_AND_PREWASH:
        console.log('update endo status to leak test passed');
        // i need to know which endo
        await this.endosService.updateStatus(
          session.endoId,
          input.passed
            ? ENDO_STATUS_OBJ.LEAK_TEST_PASSED
            : ENDO_STATUS_OBJ.LEAK_TEST_FAILED,
        );
        break;
      case ACTION_TYPE_OBJ.DISINFECT:
        console.log('update status to disinfected');
        await this.endosService.updateStatus(
          session.endoId,
          input.passed
            ? ENDO_STATUS_OBJ.DISINFECTION_PASSED
            : ENDO_STATUS_OBJ.DISINFECTION_FAILED,
        );
        break;
      case ACTION_TYPE_OBJ.STORE:
        console.log('update status to drying');
        console.log('end the session');
        await this.endosService.updateStatus(
          session.endoId,
          ENDO_STATUS_OBJ.DRYING,
        );
        await this.sessionsService.endSession(input.sessionId);
        break;
      default:
        console.log('do nothing');
    }

    const newAction = this.actionsRepository.create(actionInput);
    return this.actionsRepository.save(newAction);
  }

  findAll() {
    return `This action returns all actions`;
  }

  findOneByX(id: string, type: string) {
    return `This action returns a #${id} action`;
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
