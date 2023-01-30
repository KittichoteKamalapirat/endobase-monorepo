import {
  forwardRef, Module
} from '@nestjs/common';
import { SettingModule } from '../../setting/setting.module';
import { ContainersModule } from '../containers/containers.module';
import { SnapshotsModule } from '../snapshots/snapshots.module';
import { SerialportsResolver } from './serialports.resolver';
import { SerialportsService } from './serialports.service';

@Module({
  imports: [SnapshotsModule, forwardRef(() => ContainersModule), forwardRef(() => SettingModule)],
  providers: [SerialportsResolver, SerialportsService],
  exports: [SerialportsService],
})
export class SerialportsModule { }
