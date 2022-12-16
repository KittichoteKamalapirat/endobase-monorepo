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
import { getDateTimeDiffInSec } from '../../utils/getDateTimeDiffInSec';
import { nameSchedule } from '../../utils/nameSchedule';
import { EndosService } from '../endos/endos.service';
import { ENDO_STATUS } from '../endos/entities/endo.entity';
import { AddScheduleInput } from './dto/add-schedule.input';
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
    // init all the jobs in db
    console.log(`EndoCronsService has been initialized.`);
    const crons = await this.findAllInDb();

    // add schedule for every cron in the db
    crons.forEach(async (cron) => {
      const { endoId, toBeStatus, isoDate } = cron;
      const secFromNow = getDateTimeDiffInSec(dayjs(isoDate), dayjs());
      console.log(
        `Add cron for endo ${endoId} to be ${toBeStatus} in ${secFromNow} sec`,
      );
      await this.addSchedule({
        endoId,
        toBeStatus,
        seconds: secFromNow,
        saveToDb: false,
      });
    });
  }

  async saveInDb(input: CreateEndoCronInput): Promise<EndoCron> {
    const newInput = this.endoCronsRepository.create(input);
    const newCron = await this.endoCronsRepository.save(newInput);
    return newCron;
  }

  async addSchedule({
    endoId,
    toBeStatus,
    seconds,
    saveToDb,
  }: AddScheduleInput) {
    console.log('xxxxxxxxx', toBeStatus, seconds);
    const name = nameSchedule({ endoId, status: toBeStatus, seconds });
    const callback = async () => {
      this.logger.warn(`Timeout ${name} executing after (${seconds}) seconds!`);
      // delete when it is already called
      await this.removeInDbByEndoIdAndStatus({ endoId, toBeStatus });

      if (toBeStatus === 'ready') return this.endosService.setReady(endoId);
      if (toBeStatus === 'expire_soon')
        return this.endosService.setExpireSoon(endoId);
      if (toBeStatus === 'expired') return this.endosService.setExpired(endoId);
      return;
    };

    const establishTimeout = setTimeout(callback, seconds * 1000);
    this.schedulerRegistry.addTimeout(name, establishTimeout);

    const input = {
      endoId,
      toBeStatus,
      isoDate: dayjs().add(seconds, 'second').format(DAYJS_DATE_TIME_FORMAT),
    };

    if (saveToDb) await this.saveInDb(input);

    return;
  }

  async findAllInDb() {
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
  async removeAllInDbByEndoId(id: string): Promise<boolean> {
    try {
      await this.endoCronsRepository.delete({ endoId: id });
      return true;
    } catch (error) {
      return false;
    }
  }

  // there should be only one row per endoId
  async removeInDbByEndoIdAndStatus({
    endoId,
    toBeStatus,
  }: {
    endoId: string;
    toBeStatus: ENDO_STATUS;
  }): Promise<boolean> {
    try {
      await this.endoCronsRepository.delete({ endoId, toBeStatus });
      return true;
    } catch (error) {
      return false;
    }
  }

  async deleteEveryScheduleByEndoId({ endoId }: { endoId: string }) {
    const allSchedules = this.getTimeouts();
    const matchedSchedules = allSchedules.filter((name) =>
      name.includes(endoId),
    );
    // remove all crons in db by endoId
    await this.removeAllInDbByEndoId(endoId);

    // remove all crons in memory
    matchedSchedules.forEach((scheduleName) => {
      this.schedulerRegistry.deleteTimeout(scheduleName);
      this.logger.warn(`Timeout ${scheduleName} deleted!`);
    });
  }

  getTimeouts() {
    const timeouts = this.schedulerRegistry.getTimeouts();
    timeouts.forEach((key) => this.logger.log(`Timeout: ${key}`));
    return timeouts;
  }
}
