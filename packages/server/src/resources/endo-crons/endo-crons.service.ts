import {
  forwardRef,
  Inject,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import dayjs from 'dayjs';
import { Repository } from 'typeorm';
import { AppService } from '../../app.service';
import { DAYJS_DATE_TIME_FORMAT } from '../../constants';
import { getDateTimeDiffInMilliSec } from '../../utils/getDateTimeDiffInMilliSec';
import { nameSchedule } from '../../utils/nameSchedule';
import { EndosService } from '../endos/endos.service';
import { ENDO_STATUS } from '../endos/entities/endo.entity';
import { CreateEndoCronInput } from './dto/create-endo-cron.input';
import { UpdateEndoCronInput } from './dto/update-endo-cron.input';
import { EndoCron } from './entities/endo-cron.entity';

@Injectable()
export class EndoCronsService implements OnModuleInit {
  private readonly logger = new Logger(AppService.name);
  constructor(
    private schedulerRegistry: SchedulerRegistry,
    @InjectRepository(EndoCron)
    private endoCronsRepository: Repository<EndoCron>,
    @Inject(forwardRef(() => EndosService))
    private endosService: EndosService,
  ) {}

  async onModuleInit() {
    console.log(`The module has been initialized.`);
    const crons = await this.findAll();

    // add schedule for every cron in the db
    crons.forEach((cron) => {
      const { endoId, toBeStatus, isoDate } = cron;
      const diff = getDateTimeDiffInMilliSec(dayjs(isoDate), dayjs());
      console.log(
        'Add cron for endo ',
        endoId,
        ' to be ',
        toBeStatus,
        ' in ',
        diff,
        ' sec',
      );
      this.addSchedule(endoId, toBeStatus, diff);
    });
  }

  async saveInDb(input: CreateEndoCronInput): Promise<EndoCron> {
    const newCron = this.endoCronsRepository.create(input);
    return this.endoCronsRepository.save(newCron);
  }

  addSchedule(endoId: string, toBeStatus: ENDO_STATUS, milliseconds: number) {
    const name = `Endo: ${endoId} is to be ${toBeStatus}`;
    const callback = async () => {
      this.logger.warn(`Timeout ${name} executing after (${milliseconds})!`);
      // delete since it's already called
      await this.removeInDbByEndoId(endoId);
      if (toBeStatus === 'ready') return this.endosService.setReady(endoId);
      if (toBeStatus === 'expire_soon')
        return this.endosService.setExpireSoon(endoId);
      if (toBeStatus === 'expired') return this.endosService.setExpired(endoId);
      return;
    };

    const establishTimeout = setTimeout(callback, milliseconds);
    this.schedulerRegistry.addTimeout(name, establishTimeout);

    const input = {
      endoId,
      toBeStatus,
      isoDate: dayjs().format(DAYJS_DATE_TIME_FORMAT),
    };

    this.saveInDb(input);
  }

  async findAll() {
    const crons = await this.endoCronsRepository.find();

    return crons;
  }

  findOne(id: number) {
    return `This action returns a #${id} endoCron`;
  }

  update(id: number, updateEndoCronInput: UpdateEndoCronInput) {
    return `This action updates a #${id} endoCron`;
  }

  async removeInDb(id: string): Promise<boolean> {
    try {
      await this.endoCronsRepository.delete(id);
      return true;
    } catch (error) {
      return false;
    }
  }

  // there should be only one row per endoId
  async removeInDbByEndoId(id: string): Promise<boolean> {
    try {
      await this.endoCronsRepository.delete({ endoId: id });
      return true;
    } catch (error) {
      return false;
    }
  }

  // there should be only one row per endoId
  async removeInDbByName(id: string): Promise<boolean> {
    try {
      await this.endoCronsRepository.delete({ endoId: id });
      return true;
    } catch (error) {
      return false;
    }
  }

  async deleteSchedule({
    endoId,
    toBeStatus,
  }: {
    endoId: string;
    toBeStatus: ENDO_STATUS;
  }) {
    const scheduleName = nameSchedule({
      endoId,
      status: toBeStatus,
    });

    const allSchedules = this.getTimeouts();
    if (!allSchedules.includes(scheduleName)) return;

    await this.removeInDbByEndoId(endoId);
    this.schedulerRegistry.deleteTimeout(scheduleName);
    this.logger.warn(`Timeout ${scheduleName} deleted!`);

    // const timeout = this.schedulerRegistry.getTimeout(name);

    // clearTimeout(timeout);
  }

  getTimeouts() {
    const timeouts = this.schedulerRegistry.getTimeouts();
    timeouts.forEach((key) => this.logger.log(`Timeout: ${key}`));
    return timeouts;
  }
}
