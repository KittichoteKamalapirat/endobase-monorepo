import cors from 'cors';
import passport from 'passport';
import session from 'express-session';
import Redis from 'ioredis';
import connectRedis from 'connect-redis';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { COOKIE_NAME, IS_PROD, SESSION_SECRET } from './constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  // session so auth works

  const RedisStore = connectRedis(session);
  const redis = new Redis(process.env.REDIS_URL);

  app.use(
    session({
      name: COOKIE_NAME, // TODO add dot env
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true, // so that Javascript's front end can't access cookie
        sameSite: 'lax', // csrf
        secure: IS_PROD, // cookie only works in https
        domain: IS_PROD ? '.cookknow.com' : undefined, // no need if in development
      },
      saveUninitialized: false,
      secret: SESSION_SECRET,
      resave: false,
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(4001);
}
bootstrap();
