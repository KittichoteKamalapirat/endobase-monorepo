import { DynamicModule, Injectable, Module, Provider } from '@nestjs/common';
import { SerialPort } from 'serialport';
import {
  serialportPathA,
  serialportPathB,
  serialportPathC,
  SERIALPORTS_PROVIDER,
} from '../../constants';
import { SettingModule } from '../../setting/setting.module';
import { ContainersModule } from '../containers/containers.module';
import { SnapshotsModule } from '../snapshots/snapshots.module';
import { SnapshotsService } from '../snapshots/snapshots.service';
import { SerialportsService } from './serialports.service';

@Module({
  imports: [SnapshotsModule, ContainersModule, SettingModule],
  providers: [
    // SerialportsResolver,
    SerialportsService,
    // {
    //   provide: 'SerialHandlerService',
    //   useFactory: SerialHandlerService,
    // },
  ],
  exports: [SerialportsService],
})
@Injectable()
export class SerialportsModule {
  constructor(private snapshotsService: SnapshotsService) {}

  // forRoot is just a convention, can be any name

  static forRoot(): DynamicModule {
    const spForContainerA = new SerialPort({
      path: serialportPathA,
      baudRate: 9600,
      autoOpen: true,
    });
    const spForContainerB = new SerialPort({
      path: serialportPathB,
      baudRate: 9600,
      autoOpen: true,
    });
    const spForContainerC = new SerialPort({
      path: serialportPathC,
      baudRate: 9600,
      autoOpen: true,
    });

    // make this match with container
    const serialports = {
      A: spForContainerA,
      B: spForContainerB,
      C: spForContainerC,
    };

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
