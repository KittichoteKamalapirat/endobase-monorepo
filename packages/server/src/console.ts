import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SerialportsService } from './resources/serialports/serialports.service';

async function bootstrap() {
    const application = await NestFactory.createApplicationContext(
        AppModule,
    );

    const command = process.argv[2];

    switch (command) {
        case 'blink-serialport':
            const serialportsService = application.get(SerialportsService);
            await serialportsService.blinkLocation(({
                row: 1,
                col: "a",
            }))
            break;
            break
        default:
            console.log('Command not found');
            process.exit(1);
    }

    await application.close();
    process.exit(0);
}

bootstrap();