import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const application = await NestFactory.createApplicationContext(AppModule);

  

  await application.close();
  process.exit(0);
}

bootstrap();
