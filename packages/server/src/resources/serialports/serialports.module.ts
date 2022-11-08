import { Module } from '@nestjs/common';
import { SerialportsResolver } from './serialports.resolver';
import { SerialportsService } from './serialports.service';

@Module({
  providers: [
    SerialportsResolver,
    SerialportsService,
    // {
    //   provide: 'SerialHandlerService',
    //   useFactory: SerialHandlerService,
    // },
  ],
  exports: [SerialportsService],
})
export class SerialportsModule {}
