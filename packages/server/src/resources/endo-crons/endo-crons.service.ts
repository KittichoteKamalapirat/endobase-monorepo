import {
  forwardRef,
  Inject,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { CronJob } from 'cron';
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
    const crons = await this.findAllInDb();

    // sort by date so it's run in order
    // (ready => expiresoon => expire)
    // not (expire => ready => expire_soon) etc
    const sortDateAsc = (a: EndoCron, b: EndoCron) =>
      new Date(a.isoDate).valueOf() - new Date(b.isoDate).valueOf();
    crons.sort(sortDateAsc);

    crons.forEach(async (cron) => {
      const { endoId, toBeStatus, isoDate } = cron;
      const secFromNow = getDateTimeDiffInSec(dayjs(), dayjs(isoDate));
      console.log(
        `Add cron for endo ${endoId} to be ${toBeStatus} in ${secFromNow} sec`,
      );

      // if isoDate is in the future, add schedule for every cron in the db
      // if in the past, run them now!
      if (secFromNow > 0) {
        await this.addSchedule({
          endoId,
          toBeStatus,
          // seconds: secFromNow,
          jsDate: new Date(cron.isoDate),
          saveToDb: false,
        });
      } else {
        //run in order so the order doees not mess up
        await this.runPastCallbacks({ toBeStatus, endoId });
      }
    });
  }

  async saveInDb(input: CreateEndoCronInput): Promise<EndoCron> {
    const newInput = this.endoCronsRepository.create(input);
    const newCron = await this.endoCronsRepository.save(newInput);
    return newCron;
  }

  async runPastCallbacks({
    toBeStatus,
    endoId,
  }: {
    toBeStatus: ENDO_STATUS;
    endoId: string;
  }) {
    if (toBeStatus === 'ready') return this.endosService.setReady(endoId);
    if (toBeStatus === 'expire_soon') {
      return this.endosService.setExpireSoon(endoId);
    }
    if (toBeStatus === 'expired') {
      this.endosService.setExpired(endoId);
    }
    // delete when it is already called
    await this.removeInDbByEndoIdAndStatus({ endoId, toBeStatus });
    return;
  }

  async addSchedule({
    endoId,
    toBeStatus,
    // seconds,
    jsDate,
    saveToDb,
  }: AddScheduleInput) {
    // console.log('xxxxxxxxx', toBeStatus, seconds);
    const name = nameSchedule({ endoId, status: toBeStatus, jsDate });
    const callback = async () => {
      this.logger.warn(
        `Timeout ${name} executing at ${jsDate.toLocaleDateString('th-th')}!`,
      );

      console.log('before calling the remove in db ');

      if (toBeStatus === 'ready') return this.endosService.setReady(endoId);
      if (toBeStatus === 'expire_soon') {
        return this.endosService.setExpireSoon(endoId);
      }

      if (toBeStatus === 'expired') {
        this.endosService.setExpired(endoId);
      }
      // delete when it is already called
      await this.removeInDbByEndoIdAndStatus({ endoId, toBeStatus });
      return;
    };

    // const establishTimeout = setTimeout(callback, seconds * 1000);
    // this.schedulerRegistry.addTimeout(name, establishTimeout);

    const job = new CronJob(jsDate, callback);
    this.schedulerRegistry.addCronJob(name, job);
    job.start();

    // second mins hours dayOfMont month dayOfWeek
    // every 30 mins => 0 */30 * * * *
    // every 29 days => 0 0 */29 * * *

    const input = {
      endoId,
      toBeStatus,
      isoDate: dayjs(jsDate).format(DAYJS_DATE_TIME_FORMAT),
    };

    if (saveToDb) await this.saveInDb(input);

    return;
  }

  // addCronJob(name: string, seconds: string) {
  //   const date = new Date(2012, 11, 21, 5, 30, 0);

  //   const job = new CronJob(date, () => {
  //     this.logger.warn(`time (${seconds}) for job ${name} to run!`);
  //   });

  //   this.schedulerRegistry.addCronJob(name, job);
  //   job.start();

  //   this.logger.warn(
  //     `job ${name} added for each minute at ${seconds} seconds!`,
  //   );
  // }

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

  getCrons() {
    const jobs = this.schedulerRegistry.getCronJobs();

    const result = [];
    console.log('jobs', jobs);
    jobs.forEach((value, key) => {
      // valye => a bunch of stuff
      // key => name
      // Map(4) {
      // 'Schedule: Endo a8d1a912-8c4e-433b-ae23-b301228b113e is to be ready at 2022-12-17T16:49:50.823Z' => random stuff

      let next;
      try {
        next = value.nextDates().toJSDate();
        console.log('xxxxxx');
        console.log('next', next);
        console.log('js', value.nextDates().toJSDate());
        console.log('iso', value.nextDates().toISODate());
        console.log(
          'local',
          value.nextDates().toLocaleString({ timeZone: 'Asia/Bangkok' }),
        );
      } catch (e) {
        next = 'error: next fire date is in the past!';
      }
      const message = `JOB NAME: "${key}". \n EXECUTE AT: ${next}`;
      this.logger.log(message);
      result.push(message);
    });
    return result;
  }
}
