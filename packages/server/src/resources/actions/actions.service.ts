import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { AppService } from '../../app.service';

import { minToMillisec } from '../../utils/minToMillisec';
import { EndoCronsService } from '../endo-crons/endo-crons.service';
import { EndosService } from '../endos/endos.service';
import { ENDO_STATUS_OBJ } from '../endos/entities/endo.entity';
import { Officer } from '../officers/entities/officer.entity';
import { OfficersService } from '../officers/officers.service';
import { SerialportsService } from '../serialports/serialports.service';
import { SessionsService } from '../sessions/sessions.service';
import { CreateActionInput } from './dto/create-action.input';
import { Action, ACTION_TYPE_OBJ } from './entities/action.entity';

@Injectable()
export class ActionsService {
  private readonly logger = new Logger(AppService.name);
  constructor(
    @InjectRepository(Action)
    private actionsRepository: Repository<Action>, // use database, make sure forFeature is in module
    private officersService: OfficersService,
    private sessionsService: SessionsService,
    private serialportsService: SerialportsService,
    private endosService: EndosService,
    private endosCronService: EndoCronsService,
  ) {}

  // if therre is existing officer (with the officerNum), use it
  // otherwise, create one!

  // if type = leak test or disinfect, have to update endo status
  // if type = store, have to update endo status, end session, and change light color
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
        // update session
        await this.sessionsService.endSession(input.sessionId);

        // update endo's lastPutBackISO
        await this.endosService.updateLastPutBackISO(session.endoId);

        // create schedule to ready in 30 mins
        this.endosCronService.addSchedule({
          endoId: session.endoId,
          toBeStatus: 'ready',
          milliseconds: minToMillisec(session.endo.dryingTime),
          saveToDb: true,
        });

        // update color on lightbox
        this.serialportsService.writeColor({
          row: session.endo.tray.row,
          col: session.endo.tray.container.col,
          endoStatus: ENDO_STATUS_OBJ.DRYING,
        });

        break;
      default:
        console.log('do nothing');
    }

    const newAction = this.actionsRepository.create(actionInput);
    return this.actionsRepository.save(newAction);
  }

  // @Timeout(1000)
  // handleTimeout() {
  //   this.logger.debug('called after 1 sec');
  // }

  async findAll() {
    const actions = await this.actionsRepository.find({
      relations: [
        'session',
        'session.endo',
        'session.endo.tray', // for getting position
        'session.endo.tray.container', // for getting position
        'session.patient',
        'officer',
      ],
    });
    return actions;
  }

  findOneByX(id: string, type: string) {
    return `This action returns a #${id} action`;
  }

  async findOneById(id: string): Promise<Action> {
    return this.actionsRepository.findOneBy({ id });
  }

  // TODO rethink
  // async update(id: string, input: UpdateActionInput): Promise<ActionResponse> {
  //   const action = await this.findOneById(id);

  //   if (!action)
  //     return {
  //       errors: [{ field: 'Activity', message: 'Cannot find the activity' }],
  //     };
  //   const updatedAction = { ...action, officerNum: input.officerNum };
  //   const newAction = await this.actionsRepository.save(updatedAction);
  //   return { action: newAction };
  // }

  async paginate(options: IPaginationOptions): Promise<Pagination<Action>> {
    const paginatedResults = await paginate<Action>(
      this.actionsRepository,
      options,
    );

    // console.log('paginatedResults', paginatedResults.items.map(item => item.officer))
    // attach session, inside session there is already other stuff!
    await Promise.all(
      paginatedResults.items.map(async (item) => {
        const officer = await this.officersService.findOneById(item.officerId);
        const session = await this.sessionsService.findOne(item.sessionId);
        item.session = session;
        item.officer = officer;
        return item;
      }),
    );

    return paginatedResults;
  }

  remove(id: number) {
    return `This action removes a #${id} action`;
  }
}
