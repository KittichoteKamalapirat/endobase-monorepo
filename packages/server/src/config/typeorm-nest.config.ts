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

export const typeormConfigNest = {
  type: 'postgres' as const,
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'chain123',
  database: 'endobase_dev',
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
  ],
  synchronize: true,
  logging: true,
};
