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

const envPath = (() => {
  if (ENV === 'production') return '.env.production';
  return '.env.development'; // no env or env===prod
})();

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: envPath,
      isGlobal: true,
    }),
    // graphql
    GraphQLModule.forRoot<ApolloDriverConfig>({
      cors: {
        origin: [
          'http://localhost:3000',
          'http://localhost:3001',
          'http://localhost:51108',
          'http://localhost',
          'http://192.168.1.200',
          'http://192.168.0.100',
          'http://192.168.0.100:3000',
          'http://172.31.64.1',
          'http://172.31.64.1:3000',
          'http://192.168.1.100',
        ], // in url bar: "endosupply/", "localhost"
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
        // get the cookie from the request
        // verify the cookie
        // attach the user object to the request object
        return { req, res };
      },
    }),
    // typeorm
    TypeOrmModule.forRoot(typeormConfigNest),
    ScheduleModule.forRoot(),
    SerialportsModule, // can add dynamic data
    // resoureces
    SettingModule,
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
    EndoCronsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
