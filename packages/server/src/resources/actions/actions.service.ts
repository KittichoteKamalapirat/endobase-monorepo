import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import dayjs from 'dayjs';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { AppService } from '../../app.service';
import { EXPIRE_SOON_DAYS, MAX_STORAGE_DAYS } from '../../constants';

import { EndoCronsService } from '../endo-crons/endo-crons.service';
import { EndosService } from '../endos/endos.service';
import { ENDO_STATUS_OBJ } from '../endos/entities/endo.entity';
import { Officer } from '../officers/entities/officer.entity';
import { OfficersService } from '../officers/officers.service';
import { SerialportsService } from '../serialports/serialports.service';
import { SessionsService } from '../sessions/sessions.service';
import ActionResponse from './dto/action-response';
import { CreateActionInput } from './dto/create-action.input';
import { Action, ACTION_TYPE_OBJ } from './entities/action.entity';
import { UpdateActionInput } from './dto/update-action.input';
import { getErrorResponse } from '../../utils/getErrorResponse';

@Injectable()
export class ActionsService {
  private readonly logger = new Logger(AppService.name);
  constructor(
    @InjectRepository(Action)
    private actionsRepository: Repository<Action>, // use database, make sure forFeature is in module
    private officersService: OfficersService,
    private sessionsService: SessionsService,
    private serialportsService: SerialportsService,

    private endoCronsService: EndoCronsService,

    @Inject(forwardRef(() => EndosService))
    private endosService: EndosService,
  ) {}

  // if therre is existing officer (with the officerNum), use it
  // otherwise, create one!

  // if type = leak test or disinfect, have to update endo status
  // if type = store, have to update endo status, end session, and change light color
  async create(input: CreateActionInput): Promise<ActionResponse> {
    // make sure, an action is not already created
    const action = await this.actionsRepository.findOneBy({
      sessionId: input.sessionId,
      type: input.type,
      passed: input.passed,
    });

    // for bring_to_washing_room, leak_test and disinfect => can do many times
    //
    if (action && (action.type === 'store' || action.type === 'take_out'))
      return {
        errors: [
          {
            message: `${input.type} has already been completed`, // store, take_out
            field: 'action',
          },
        ],
      };

    const existingOfficer = await this.officersService.findOneByofficerNum(
      input.officerNum,
    );

    let officer: Officer | null = null;
    if (!existingOfficer) {
      return {
        errors: [
          {
            message: `This officer number does not exist`,
            field: 'officerNum',
          },
        ],
      };
    } else {
      officer = existingOfficer;
    }

    const actionInput = {
      sessionId: input.sessionId,
      type: input.type,
      passed: input.passed,
      officerId: officer.id,
      note: input.note,
    };

    // find session to get the endoId

    const session = await this.sessionsService.findOne(input.sessionId);
    if (!session)
      return {
        errors: [
          {
            message: 'Cannot find a session',
            field: 'session',
          },
        ],
      };

    // update endo status
    switch (input.type) {
      case ACTION_TYPE_OBJ.TAKE_OUT:
        await this.endosService.updateStatus(
          session.endoId,
          ENDO_STATUS_OBJ.BEING_USED,
        );
        break;
      case ACTION_TYPE_OBJ.BRING_TO_WASHING_ROOM:
        await this.endosService.updateStatus(
          session.endoId,
          ENDO_STATUS_OBJ.IN_WASHING_ROOM,
        );
        break;
      case ACTION_TYPE_OBJ.LEAK_TEST_AND_PREWASH:
        // i need to know which endo
        await this.endosService.updateStatus(
          session.endoId,
          input.passed
            ? 'leak_test_passed'
            : input.failedFeedback === 'bring_to_washing_room'
            ? 'being_used' // have to bring to washing room again
            : input.failedFeedback === 're_leak_test'
            ? 'in_washing_room'
            : 'being_used', // this case should not happended
        );
        break;
      case ACTION_TYPE_OBJ.DISINFECT:
        await this.endosService.updateStatus(
          session.endoId,
          input.passed
            ? 'disinfection_passed'
            : input.failedFeedback === 'bring_to_washing_room'
            ? 'being_used' // have to bring to washing room again
            : input.failedFeedback === 're_disinfection'
            ? 'leak_test_passed' // have to disinfect again
            : 'being_used', // this case should not happended
        );
        break;

      case ACTION_TYPE_OBJ.STORE:
        await this.endosService.updateStatus(
          session.endoId,
          ENDO_STATUS_OBJ.READY, // Used to be drying
        );
        // update session
        await this.sessionsService.endSession(input.sessionId);

        // update endo's lastPutBackISO
        await this.endosService.updateLastPutBackISO(session.endoId);

        // Add 3 schedules
        const endoId = session.endoId;
        // 1. create schedule to ready in 30 mins
        // No need this anymore
        // await this.endoCronsService.addSchedule({
        //   endoId,
        //   toBeStatus: 'ready',
        //   // seconds: minToSec(session.endo.dryingTime),
        //   jsDate: dayjs().add(session.endo.dryingTime, 'minute').toDate(),
        //   saveToDb: true,
        // });

        // // 2. create a schedule to expire_soon in 30 days
        await this.endoCronsService.addSchedule({
          endoId,
          toBeStatus: 'expire_soon',
          jsDate: dayjs()
            .add(MAX_STORAGE_DAYS - EXPIRE_SOON_DAYS, 'day')
            .toDate(),
          saveToDb: true,
        });

        // 3. create a schedule to expired in 1 day after
        await this.endoCronsService.addSchedule({
          endoId,
          toBeStatus: 'expired',
          jsDate: dayjs().add(MAX_STORAGE_DAYS, 'day').toDate(),
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
      // do nothing
    }

    const newAction = this.actionsRepository.create(actionInput);
    const savedAction = await this.actionsRepository.save(newAction);
    return { action: savedAction };
  }

  // @Timeout(1000)
  // handleTimeout() {
  //   this.logger.debug('called after 1 sec');
  // }

  async update(input: UpdateActionInput) {
    try {
      const existingOfficer = await this.officersService.findOneByofficerNum(
        input.officerNum,
      );
      if (!existingOfficer)
        return getErrorResponse(
          'officerNum',
          'This officer number does not exist',
        );

      const existingAction = await this.actionsRepository.findOneBy({
        id: input.id,
      });
      if (!existingAction)
        return getErrorResponse('action', 'Cannot find the action to update');

      const updatedAction = { ...existingAction, ...input };
      const savedAction = await this.actionsRepository.save(updatedAction);
      return { action: savedAction };
    } catch (error) {
      return getErrorResponse('officerNum', 'An error occured');
    }
  }

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
    const queryBuilder = this.actionsRepository.createQueryBuilder('action');
    queryBuilder.orderBy('action.createdAt', 'DESC');

    const paginatedResults = await paginate<Action>(queryBuilder, options);

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

  // for admin
  async removeAllRows() {
    try {
      const actions = await this.findAll();

      await Promise.all(
        actions.map((action) =>
          this.actionsRepository.delete({ id: action.id }),
        ),
      );
    } catch (error) {
      console.error('error remove actions', error);
    }
  }
}
