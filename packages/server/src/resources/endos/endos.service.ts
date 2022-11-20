import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEndoInput } from './dto/create-endo.input';
import { Endo, ENDO_STATUS, ENDO_STATUS_OBJ } from './entities/endo.entity';

import { SchedulerRegistry } from '@nestjs/schedule';
import { AppService } from '../../app.service';
import { MAX_STORAGE_DAYS } from '../../constants';
import { dayToMillisec } from '../../utils/dayToMillisec';
import { nameSchedule } from '../../utils/nameSchedule';
import { SerialportsService } from '../serialports/serialports.service';
import { SessionsService } from '../sessions/sessions.service';
import { UpdateDryingTimeInput } from './dto/update-drying-time.input';
import { ActionsService } from '../actions/actions.service';
// import { port1 } from '../serialports/serialportsInstances';

@Injectable()
export class EndosService {
  private readonly logger = new Logger(AppService.name);
  private x = 10;
  constructor(
    @InjectRepository(Endo)
    private endosRepository: Repository<Endo>, // use database, make sure forFeature is in module
    private sessionsService: SessionsService,
    // private actionsService: ActionsService,
    private serialportsService: SerialportsService,
    private schedulerRegistry: SchedulerRegistry,
    @Inject(forwardRef(() => ActionsService))
    private actionsService: ActionsService,
  ) {}

  async findAll(): Promise<Endo[]> {
    const endos = await this.endosRepository.find({
      relations: ['tray', 'tray.container'],
      // loadRelationIds: true,
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

  async remove(id: string): Promise<void> {
    await this.endosRepository.delete(id);
  }

  // update LED color
  // update endo status
  async pickEndo(id: string): Promise<Endo | Error> {
    // TODO add validation (like if the session is created already, don't do it)
    // TODO check by session with this endoId and null
    // update endoscope status from ready => being_used
    const endo = await this.findOne(id);
    if (!endo) return new Error('Cannot find the endoscope');
    if (
      endo.status !== 'ready' &&
      endo.status !== 'expire_soon' &&
      endo.status !== 'expired'
    )
      return new Error('This endoscope is not ready yet');
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

    if (endo.status === 'ready') {
      // save the new endo
      pickedEndo = await this.endosRepository.save({
        ...endo,
        status: ENDO_STATUS_OBJ.BEING_USED,
      });

      // remove the previously "scheduled to be expire_soon" for this endo
      const scheduleName = nameSchedule({
        endoId: endo.id,
        status: ENDO_STATUS_OBJ.EXPIRE_SOON,
      });

      this.deleteSchedule(scheduleName);
    } else if (endo.status === 'expire_soon') {
      // save the new endo (being_used)
      pickedEndo = await this.endosRepository.save({
        ...endo,
        status: ENDO_STATUS_OBJ.BEING_USED,
      });
      // remove the previously scheduled "to be expired" for this endo
      const scheduleName = nameSchedule({
        endoId: endo.id,
        status: ENDO_STATUS_OBJ.EXPIRED,
      });
      this.deleteSchedule(scheduleName);
    } else {
      // status = "expired"
      // do nothing keep it expired
      pickedEndo = await this.endosRepository.save({
        ...endo,
        status: ENDO_STATUS_OBJ.EXPIRED_AND_OUT,
      });
    }

    return pickedEndo;
  }

  async updateStatus(
    id: string,
    toBeStatus: ENDO_STATUS,
  ): Promise<Endo | Error> {
    const endo = await this.endosRepository.findOneBy({ id });

    if (!endo) return new Error('No endoscope found');
    if (toBeStatus === 'ready' && endo.status !== 'drying')
      return new Error('The endoscope is not drying');

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

  getAllTimeouts() {
    const timeouts = this.schedulerRegistry.getTimeouts();
    return timeouts;
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

    // create a schedule to expire_soon in 29 days
    this.addSchedule(
      endoId,
      'expire_soon',
      dayToMillisec(MAX_STORAGE_DAYS - 1),
    );
  }

  async setExpireSoon(endoId: string) {
    this.updateStatus(endoId, ENDO_STATUS_OBJ.EXPIRE_SOON);

    const endo = await this.findOne(endoId);
    this.serialportsService.writeColor({
      col: endo.tray.container.col,
      row: endo.tray.row,
      endoStatus: ENDO_STATUS_OBJ.EXPIRE_SOON,
    });

    // create a schedule to expired in 1 day
    this.addSchedule(endoId, 'expired', dayToMillisec(MAX_STORAGE_DAYS));
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

  // @Cron(CronExpression.EVERY_10_SECONDS)
  // addTestSchedule() {
  //   const name = String(Math.random() * 100);
  //   const callback = () => {
  //     this.logger.warn(`Timeout ${name} executing after 1 sec!`);
  //   };

  //   const establishTimeout = setTimeout(callback, 1000);
  //   this.schedulerRegistry.addTimeout(`Name: ${name}`, establishTimeout);
  // }

  addSchedule(endoId: string, toBeStatus: ENDO_STATUS, milliseconds: number) {
    const name = `Endo: ${endoId} is to be ${toBeStatus}`;
    const callback = () => {
      this.logger.warn(`Timeout ${name} executing after (${milliseconds})!`);
      if (toBeStatus === 'ready') return this.setReady(endoId);
      if (toBeStatus === 'expire_soon') return this.setExpireSoon(endoId);
      if (toBeStatus === 'expired') return this.setExpired(endoId);
      return;
    };

    const establishTimeout = setTimeout(callback, milliseconds);
    this.schedulerRegistry.addTimeout(name, establishTimeout);
  }

  deleteSchedule(name: string) {
    const allSchedules = this.getAllTimeouts();
    if (!allSchedules.includes(name)) return;

    this.schedulerRegistry.deleteTimeout(name);
    this.logger.warn(`Timeout ${name} deleted!`);

    // const timeout = this.schedulerRegistry.getTimeout(name);

    // clearTimeout(timeout);
  }

  findCurrentSessionByEndoId(endoId: string) {
    // current session = status = ongoing
    // supposed to be only one
    // what if there are many

    return this.sessionsService.findCurrentSessionByEndoId(endoId);
  }
}
