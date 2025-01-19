import { Injectable } from '@nestjs/common';
import { SettingService } from '../../setting/setting.service';
import { ActionsService } from '../actions/actions.service';
import { ContainersService } from '../containers/containers.service';
import { EndoCronsService } from '../endo-crons/endo-crons.service';
import { EndosService } from '../endos/endos.service';
import { OfficersService } from '../officers/officers.service';
import { PatientsService } from '../patients/patients.service';
import { SessionsService } from '../sessions/sessions.service';
import { SnapshotsService } from '../snapshots/snapshots.service';
import { TraysService } from '../trays/trays.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class AdminService {
  constructor(
    private usersService: UsersService,
    private containersService: ContainersService,

    private endosService: EndosService,
    private settingService: SettingService,
    private actionsService: ActionsService,
    private endoCronsService: EndoCronsService,
    private officersService: OfficersService,
    private patientsService: PatientsService,
    private sessionsService: SessionsService,
    private snapshotsService: SnapshotsService,
    private traysService: TraysService,
  ) {}

  async deleteAllData() {
    console.log('deleteAllData');
    try {
      await this.usersService.removeAllRows();
      await this.containersService.removeAllRows();
      await this.traysService.removeAllRows();
      await this.endosService.removeAllRows();
      await this.settingService.removeAllRows();
      await this.actionsService.removeAllRows();
      await this.endoCronsService.removeAllRows();
      await this.officersService.removeAllRows();
      await this.patientsService.removeAllRows();
      await this.sessionsService.removeAllRows();
      await this.snapshotsService.removeAllRows();

      console.log('deleteAllData: success');
      return { value: true };
    } catch (error) {
      console.error('error delete all data', error);

      return {
        errors: [{ field: 'admin', message: 'Cannot delete all data ' }],
      };
    }
  }

  async populateAllData() {
    console.log('populateAllData');
    try {
      await this.containersService.populateRows();
      console.log('containers created');
      await this.traysService.populateRows();
      console.log('trays created');
      await this.settingService.populateRows();
      console.log('settings created');
      await this.usersService.populateRows();
      console.log('users created');
      await this.endosService.populateRows();
      console.log('endos created');

      console.log('populateAllData: success');
      return { value: true };
    } catch (error) {
      console.error('error delete all data', error);

      return {
        errors: [{ field: 'admin', message: 'Cannot populate all data ' }],
      };
    }
  }
}
