import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminResolver } from './admin.resolver';
import { UsersModule } from '../users/users.module';
import { ContainersModule } from '../containers/containers.module';
import { TraysModule } from '../trays/trays.module';
import { SettingModule } from '../../setting/setting.module';
import { EndosModule } from '../endos/endo.module';
import { ActionsModule } from '../actions/actions.module';
import { EndoCronsModule } from '../endo-crons/endo-crons.module';
import { OfficersModule } from '../officers/officers.module';
import { PatientsModule } from '../patients/patients.module';
import { SessionsModule } from '../sessions/sessions.module';
import { SnapshotsModule } from '../snapshots/snapshots.module';

@Module({
  imports: [
    UsersModule,
    ContainersModule,
    TraysModule,
    EndosModule,
    SettingModule,
    ActionsModule,
    EndoCronsModule,
    OfficersModule,
    PatientsModule,
    SessionsModule,
    SnapshotsModule,
  ],
  providers: [AdminResolver, AdminService],
})
export class AdminModule {}
