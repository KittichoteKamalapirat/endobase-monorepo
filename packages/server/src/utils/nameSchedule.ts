import { ENDO_STATUS } from '../resources/endos/entities/endo.entity';

interface Args {
  endoId: string;
  status: ENDO_STATUS;
  // seconds: number;
  dateTime: Date;
}
export const nameSchedule = ({ endoId, status, dateTime }: Args) => {
  return `Schedule: Endo ${endoId} is to be ${status} at ${dateTime.toISOString()}`;
};
