import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEndoInput } from './dto/create-endo.input';
import { Endo, ENDO_STATUS, ENDO_STATUS_OBJ } from './entities/endo.entity';

import { AppService } from '../../app.service';
import { EndoCronsService } from '../endo-crons/endo-crons.service';
import { SerialportsService } from '../serialports/serialports.service';
import { SessionsService } from '../sessions/sessions.service';
import BooleanResponse from './dto/boolean-response.input';
import { UpdateDryingTimeInput } from './dto/update-drying-time.input';
import { UpdateEndoInput } from './dto/update-endo.input';
// import { port1 } from '../serialports/serialportsInstances';

@Injectable()
export class EndosService {
  private readonly logger = new Logger(AppService.name);

  constructor(
    @InjectRepository(Endo)
    private endosRepository: Repository<Endo>, // use database, make sure forFeature is in module
    private sessionsService: SessionsService,
    // private actionsService: ActionsService,
    private serialportsService: SerialportsService,
    @Inject(forwardRef(() => EndoCronsService))
    private endoCronsService: EndoCronsService,
  ) { }

  async findAll(): Promise<Endo[]> {
    const endos = await this.endosRepository.find({
      relations: ['tray', 'tray.container'],
      // loadRelationIds: true,
      order: {
        type: 'ASC',
        brand: 'ASC',
        model: 'ASC',
      },
    });

    return endos;
  }

  async findOne(id: string): Promise<Endo> {
    return this.endosRepository.findOne({
      where: { id },
      relations: ['tray', 'tray.container'],
    });
  }

  async createEndo(input: CreateEndoInput): Promise<Endo> {
    const newEndo = this.endosRepository.create(input);
    return this.endosRepository.save(newEndo);
  }

  async updateEndo(id: string, input: UpdateEndoInput): Promise<Endo | Error> {
    const endo = await this.endosRepository.findOneBy({ id });
    if (!endo) return new Error('Cannot find the endoscope');

    const updatedEndo = { ...endo, ...input };

    const result = await this.endosRepository.save(updatedEndo);
    return result;
  }

  async remove(id: string): Promise<BooleanResponse> {
    try {
      await this.endosRepository.delete(id);
      return { value: true };
    } catch (error) {
      return {
        errors: [{ field: 'endoscope', message: 'Cannot find the endoscope ' }],
      };
    }
  }

  // update LED color
  // update endo status
  async pickEndo(id: string): Promise<Endo | Error> {
    // TODO add validation (like if the session is created already, don't do it)
    // TODO check by session with this endoId and null
    // update endoscope status from ready, expire_soon, expired => being_used
    const endo = await this.findOne(id);
    if (!endo) return new Error('Cannot find the endoscope');
    if (
      endo.status !== 'ready' &&
      endo.status !== 'expire_soon' &&
      endo.status !== 'expired'
    )
      return new Error(
        'You cannot pick this endo because its status is neither ready, expire_soon, nor expired',
      );
    const existingSession = await this.findCurrentSessionByEndoId(id);
    if (existingSession) return new Error('This endoscope is already in use'); // TODO handle this

    // create a session
    const endoWasExpired = endo.status === 'expired';
    await this.sessionsService.create({ endoId: id, endoWasExpired });
    // create an action (take_out)
    // await this.actionsService.create({
    //   sessionId: session.id,
    //   type: 'take_out',
    //   passed: true,
    //   officerNum: '',
    // });

    // write color
    this.serialportsService.writeColor({
      col: endo.tray.container.col,
      row: endo.tray.row,
      endoStatus: ENDO_STATUS_OBJ.BEING_USED,
    });

    let pickedEndo = null;

    // const deleteInput = {
    //   endoId: endo.id,
    //   toBeStatus: ENDO_STATUS_OBJ.EXPIRE_SOON,
    // };

    if (endo.status === 'ready' || endo.status === 'expire_soon') {
      // save the new endo
      pickedEndo = await this.endosRepository.save({
        ...endo,
        status: ENDO_STATUS_OBJ.BEING_USED,
      });
    } else {
      // status = "expired"
      pickedEndo = await this.endosRepository.save({
        ...endo,
        status: ENDO_STATUS_OBJ.EXPIRED_AND_OUT,
      });
    }

    // remove all the crons in db and memory
    this.endoCronsService.deleteEveryScheduleByEndoId({ endoId: endo.id });

    return pickedEndo;
  }

  async updateStatus(
    id: string,
    toBeStatus: ENDO_STATUS,
  ): Promise<Endo | Error> {
    const endo = await this.endosRepository.findOneBy({ id });

    if (!endo) return new Error('No endoscope found');
    // if ( !["ready","drying", "disinfection_passed"].includes(toBeStatus)  )
    //   return new Error('The endoscope is not drying');

    const updatedEndo = { ...endo, status: toBeStatus };

    return this.endosRepository.save(updatedEndo);
  }

  async updateDryingTime(input: UpdateDryingTimeInput): Promise<Endo | Error> {
    const endo = await this.endosRepository.findOneBy({ id: input.endoId });

    if (!endo) return new Error('No endoscope found');
    const updatedEndo = { ...endo, dryingTime: input.mins };

    return this.endosRepository.save(updatedEndo);
  }

  async updateLastPutBackISO(id: string): Promise<Endo | Error> {
    const endo = await this.endosRepository.findOneBy({ id });

    if (!endo) return new Error('No endoscope found');

    const updatedEndo: Endo = {
      ...endo,
      lastPutBackISO: new Date().toISOString(),
    };

    return this.endosRepository.save(updatedEndo);
  }

  //   // update db
  // // change lightbox
  // async updateStatusAndLightBox(endoId: string, status: ENDO_STATUS) {
  //   const endo = await this.findOne(endoId); // find the endo for col and row

  //   // update db
  //   this.updateStatus(endoId, status);

  //   // change lightbox
  //   this.serialportsService.writeColor({
  //     col: endo.tray.container.col,
  //     row: endo.tray.row,
  //     endoStatus: status,
  //   });
  // }

  async setReady(endoId: string) {
    // update endo status to ready
    this.updateStatus(endoId, ENDO_STATUS_OBJ.READY);

    // change light box color to green
    const endo = await this.findOne(endoId); // find the endo for col and row
    this.serialportsService.writeColor({
      col: endo.tray.container.col,
      row: endo.tray.row,
      endoStatus: ENDO_STATUS_OBJ.READY,
    });
  }

  async setExpireSoon(endoId: string) {
    this.updateStatus(endoId, ENDO_STATUS_OBJ.EXPIRE_SOON);

    const endo = await this.findOne(endoId);
    this.serialportsService.writeColor({
      col: endo.tray.container.col,
      row: endo.tray.row,
      endoStatus: ENDO_STATUS_OBJ.EXPIRE_SOON,
    });
  }

  // update db
  // change lightbox
  async setExpired(endoId: string) {
    this.updateStatus(endoId, ENDO_STATUS_OBJ.EXPIRED);

    const endo = await this.findOne(endoId);
    this.serialportsService.writeColor({
      col: endo.tray.container.col,
      row: endo.tray.row,
      endoStatus: ENDO_STATUS_OBJ.EXPIRED,
    });
  }



  findCurrentSessionByEndoId(endoId: string) {
    // current session = status = ongoing
    // supposed to be only one
    // what if there are many

    return this.sessionsService.findCurrentSessionByEndoId(endoId);
  }


  async washWithoutStoring(id: string) {
    // do 4 things
    // end session
    // update endo status from disinfection_passed to leaktest_passed
    // create a new session

    await this.sessionsService.endSessionByEndoId(id)
    await this.updateStatus(id, "being_used")
    const newSession = await this.sessionsService.create({ endoId: id, endoWasExpired: false })

    return newSession
  }
}
