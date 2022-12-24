import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ScheduleModule } from '@nestjs/schedule';
import { typeormConfigNest } from './config/typeorm-nest.config';
import { ActionsModule } from './resources/actions/actions.module';
import { AuthModule } from './resources/auth/auth.module';
import { ContainersModule } from './resources/containers/containers.module';
import { EndosModule } from './resources/endos/endo.module';
import { OfficersModule } from './resources/officers/officers.module';
import { PatientsModule } from './resources/patients/patients.module';
import { SerialportsModule } from './resources/serialports/serialports.module';
import { SessionsModule } from './resources/sessions/sessions.module';
import { SnapshotsModule } from './resources/snapshots/snapshots.module';
import { TraysModule } from './resources/trays/trays.module';
import { UsersModule } from './resources/users/users.module';
import { SettingModule } from './setting/setting.module';
import { EndoCronsModule } from './resources/endo-crons/endo-crons.module';
import { ConfigModule } from '@nestjs/config';

// could be "mac-dev", "win-dev", "wind-prod"
const ENV = process.env.NODE_ENV;
console

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: !ENV ? '.env.prod' : `.env.${ENV}`,
      isGlobal: true
    }),
    // graphql
    GraphQLModule.forRoot<ApolloDriverConfig>({
      cors: {
        origin: [
          'http://localhost',
          "http://endosupply",

          'https://localhost',
          'https://localhost/',
          "https://endosupply",
          "https://endosupply.com",

          "http://172.21.32.1"], // in url bar: "endosupply/", "localhost"
        credentials: true,
      },
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      driver: ApolloDriver,
      installSubscriptionHandlers: true,
      subscriptions: {
        'graphql-ws': true,
        'subscriptions-transport-ws': true, // with   out this, it won't work since graphql playground does not support graphql-ws yet, so have to use both
      },

      context: ({ req, res }) => {
        console.log('req.session', req.session)


        // get the cookie from the request
        // verify the cookie
        // attach the user object to the request object
        return { req, res };
      },
    }),
    // typeorm
    TypeOrmModule.forRoot(typeormConfigNest),
    ScheduleModule.forRoot(),
    SerialportsModule.forRoot(), // can add dynamic data
    // resoureces
    EndosModule,
    ContainersModule,
    TraysModule,
    ActionsModule,
    SessionsModule,
    OfficersModule,
    PatientsModule,
    SnapshotsModule,
    UsersModule,
    AuthModule,
    SettingModule,
    EndoCronsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})



export class AppModule { }
