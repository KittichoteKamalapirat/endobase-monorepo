import { RepairRequest } from 'src/resources/repair-request/entities/repair-request.entity';
import { Action } from '../resources/actions/entities/action.entity';
import { Container } from '../resources/containers/entities/container.entity';
import { EndoCron } from '../resources/endo-crons/entities/endo-cron.entity';
import { Endo } from '../resources/endos/entities/endo.entity';
import { Officer } from '../resources/officers/entities/officer.entity';
import { Patient } from '../resources/patients/entities/patient.entity';
import { Session } from '../resources/sessions/entities/session.entity';
import { Snapshot } from '../resources/snapshots/entities/snapshot.entity';
import { Tray } from '../resources/trays/entities/tray.entity';
import { User } from '../resources/users/entities/user.entity';
import { Setting } from '../setting/entities/setting.entity';

console.log('-----------------');
console.log('env', process.env.NODE_ENV);
console.log('process.env.NODE_ENV', process.env.NODE_ENV);
console.log('PGDATABASE', process.env.PGDATABASE);
console.log('PGHOST', process.env.PGHOST);
console.log('PGPASSWORD', process.env.PGPASSWORD);
console.log('PGPORT', process.env.PGPORT);
console.log('PGUSER', process.env.PGUSER);
console.log('REDIS_URL', process.env.REDIS_URL);
console.log('-----------------');

export const typeormConfigNest = {
  type: 'postgres' as const,
  url: 'postgresql://postgres:awBHusoLbuHYLMCtHniLMHdbKfKBXwpL@:5432/railway',
  // host: process.env.PGHOST,
  // port: Number(process.env.PGPORT),
  // username: process.env.PGUSER,
  // password: process.env.PGPASSWORD,
  // database: process.env.PGDATABASE,

  entities: [
    Endo,
    Container,
    Tray,
    Action,
    Patient,
    Session,
    Officer,
    Snapshot,
    User,
    Setting,
    EndoCron,
    RepairRequest,
  ],
  synchronize: true,
  logging: false,
};
