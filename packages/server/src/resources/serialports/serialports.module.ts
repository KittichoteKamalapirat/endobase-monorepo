import { Module } from '@nestjs/common';
import { SerialportsController } from './serialports.controller';
import { SerialHandlerService } from './serialports.service';

@Module({
  controllers: [SerialportsController],
  // providers: [SerialportsService]
  providers: [
    {
      provide: 'SerialHandlerService',
      useFactory: SerialHandlerService,
    },
  ],
})
export class SerialportsModule {}
