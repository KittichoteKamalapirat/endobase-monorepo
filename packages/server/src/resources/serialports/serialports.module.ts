import {
  DynamicModule,
  forwardRef,
  Injectable,
  Module,
  Provider,
} from '@nestjs/common';
import { SerialPort } from 'serialport';
import { SERIALPORTS_PROVIDER } from '../../constants';
import { SettingModule } from '../../setting/setting.module';
import {
  containerTypeOptions,
  CONTAINER_TO_SERIALPORT_PATH_MAPPER,
  MySerialPort,
} from '../../types/CONTAINER_TYPE';
import { getConnectedArduinos } from '../../utils/getConnectedArduinos';
import { initSerialports } from '../../utils/initSerialPorts';
import { ContainersModule } from '../containers/containers.module';
import { SnapshotsModule } from '../snapshots/snapshots.module';
import { SnapshotsService } from '../snapshots/snapshots.service';
import { SerialportsResolver } from './serialports.resolver';
import { SerialportsService } from './serialports.service';

@Module({
  imports: [SnapshotsModule, forwardRef(() => ContainersModule), SettingModule],
  providers: [SerialportsResolver, SerialportsService],
  exports: [SerialportsService],
})
@Injectable()
export class SerialportsModule {
  constructor(private snapshotsService: SnapshotsService) { }

  // forRoot is just a convention, can be any name

  static async forRoot(): Promise<DynamicModule> {
    const connectedArduinos = await getConnectedArduinos();

    const serialports = {} as MySerialPort;

    // init every row that is connected
    // result will be
    //   A: SerialPort,
    // B: null,
    //   C: SerialPort,

    // containerTypeOptions.forEach((option) => {
    //   const col = option.value;
    //   const toConnectPath = CONTAINER_TO_SERIALPORT_PATH_MAPPER[col];
    //   const isConnected = !!connectedArduinos.find(
    //     (portInfo) => portInfo.path === toConnectPath,
    //   );

    //   console.log('toConnectPath', toConnectPath);
    //   console.log('isConnected', isConnected);

    //   if (!isConnected) {
    //     serialports[col] = null;
    //     return;
    //   }

    //   const sp = new SerialPort({
    //     path: toConnectPath,
    //     baudRate: 9600,
    //     autoOpen: true,
    //   });
    //   serialports[col] = sp;
    // });

    initSerialports({ connectedArduinos, serialports });
    // const spForContainerA = new SerialPort({
    //   path: serialportPathA,
    //   baudRate: 9600,
    //   autoOpen: true,
    // });
    // const spForContainerB = new SerialPort({
    //   path: serialportPathB,
    //   baudRate: 9600,
    //   autoOpen: true,
    // });
    // const spForContainerC = new SerialPort({
    //   path: serialportPathC,
    //   baudRate: 9600,
    //   autoOpen: true,
    // });

    // make this match with container
    // const serialports = {
    //   A: spForContainerA,
    //   // B: spForContainerB,
    //   C: spForContainerC,
    // };

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
