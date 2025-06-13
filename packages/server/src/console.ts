import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const application = await NestFactory.createApplicationContext(AppModule);

  // switch (command) {
  //     case 'blink-serialport':
  //         const serialportsService = application.get(SerialportsService);
  //         await serialportsService.blinkLocation(({
  //             row: 1,
  //             col: "a",
  //             status: "ready"
  //         }))
  //         break;
  //     case 'write-color':

  //         const serialportsService1 = application.get(SerialportsService);
  //         await serialportsService1.writeColor(({
  //             row: 1,
  //             col: "a",
  //             endoStatus: "ready"
  //         }))
  //         break;
  //     default:
  //         console.error('Command not found');
  //         process.exit(1);
  // }

  await application.close();
  process.exit(0);
}

bootstrap();
