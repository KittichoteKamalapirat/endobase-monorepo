import dayjs from 'dayjs';
import { DAYJS_DATE_TIME_FORMAT } from '../constants';
import { ENDO_STATUS } from '../resources/endos/entities/endo.entity';

interface Args {
  endoId: string;
  status: ENDO_STATUS;
  // seconds: number;
  jsDate: Date;
}
export const nameSchedule = ({ endoId, status, jsDate }: Args) => {
  return `Schedule: Endo ${endoId} is to be ${status} at ${dayjs(jsDate).format(
    DAYJS_DATE_TIME_FORMAT,
  )}`;
};
