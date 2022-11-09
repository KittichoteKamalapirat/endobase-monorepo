import { ENDO_STATUS } from '../resources/endos/entities/endo.entity';

interface Args {
  endoId: string;
  status: ENDO_STATUS;
}
export const nameSchedule = ({ endoId, status }: Args) => {
  return `Schedule: Endo ${endoId} is to be ${status}`;
};
