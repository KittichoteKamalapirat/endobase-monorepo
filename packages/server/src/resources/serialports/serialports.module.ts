import {
  DynamicModule,
  forwardRef,
  Injectable,
  Module,
  Provider
} from '@nestjs/common';
import { SERIALPORTS_PROVIDER } from '../../constants';
import { SettingModule } from '../../setting/setting.module';
import {
  MySerialPort
} from '../../types/CONTAINER_TYPE';
import { getConnectedArduinos } from '../../utils/getConnectedArduinos';
import { initSerialports } from '../../utils/initSerialPorts';
import { ContainersModule } from '../containers/containers.module';
import { SnapshotsModule } from '../snapshots/snapshots.module';
import { SerialportsResolver } from './serialports.resolver';
import { SerialportsService } from './serialports.service';

@Module({
  imports: [SnapshotsModule, forwardRef(() => ContainersModule), SettingModule],
  providers: [SerialportsResolver, SerialportsService],
  exports: [SerialportsService],
})
@Injectable()
export class SerialportsModule {
  constructor() { }

  // forRoot is just a convention, can be any name
  static async forRoot(): Promise<DynamicModule> {
    const connectedArduinos = await getConnectedArduinos();
    const serialports = {} as MySerialPort;

    // init every row that is connected
    // result will be
    //   A: SerialPort,
    //   B: null,
    //   C: SerialPort,
    initSerialports({ connectedArduinos, serialports });

    const serialportsProvider: Provider = {
      provide: SERIALPORTS_PROVIDER,
      useValue: serialports,
    };

    return {
      module: SerialportsModule,
      providers: [serialportsProvider],
      exports: [serialportsProvider],
      global: true,
    };
  }
}
