import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import connectRedis from 'connect-redis';
import session from 'express-session';
import Redis from 'ioredis';
import { AppModule } from './app.module';
import { COOKIE_NAME, IS_PROD, SESSION_SECRET } from './constants';

async function bootstrap() {
  // const certPath = path.resolve(__dirname, '../.cert/endosupply+4.pem');
  // const keyPath = path.resolve(__dirname, '../.cert/endosupply+4-key.pem');

  // const httpsOptions = {
  //   cert: fs.readFileSync(certPath),
  //   key: fs.readFileSync(keyPath),
  // };

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    // httpsOptions,
  });

  app.useGlobalPipes(new ValidationPipe());

  // session so auth works

  const RedisStore = connectRedis(session);
  const redis = new Redis(
    process.env.REDIS_URL,
  );
  app.set('trust proxy', 1); //IMPORTANT: (when dev, not sure about prod) endo supply need this! otherwise, refresh and cookie is gone

  app.use(
    session({
      name: COOKIE_NAME, // TODO add dot env
      store: new RedisStore({
        client: redis as any, // TODO
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true, // so that Javascript's front end can't access cookie
        sameSite: 'lax', // csrf // browser, has nothing to do with server?
        // secure: IS_PROD, // cookie only works in https
        secure: IS_PROD, // cookie only works in https
        // domain: IS_PROD ? '.cookknow.com' : undefined, // no need if in development
      },
      saveUninitialized: false,
      secret: SESSION_SECRET,
      resave: false,
    }),
  );

  const port = process.env.PORT || 4000;
  console.log('port', port);

  await app.listen(port);
}
bootstrap();
