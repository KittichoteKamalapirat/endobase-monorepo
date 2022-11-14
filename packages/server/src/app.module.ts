import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Action } from './resources/actions/entities/action.entity';
import { Container } from './resources/containers/entities/container.entity';
import { Endo } from './resources/endos/entities/endo.entity';
import { Officer } from './resources/officers/entities/officer.entity';
import { Patient } from './resources/patients/entities/patient.entity';
import { Session } from './resources/sessions/entities/session.entity';
import { Tray } from './resources/trays/entities/tray.entity';

import { ScheduleModule } from '@nestjs/schedule';
import { ActionsModule } from './resources/actions/actions.module';
import { AuthModule } from './resources/auth/auth.module';
import { ContainersModule } from './resources/containers/containers.module';
import { EndosModule } from './resources/endos/endo.module';
import { OfficersModule } from './resources/officers/officers.module';
import { PatientsModule } from './resources/patients/patients.module';
import { SerialportsModule } from './resources/serialports/serialports.module';
import { SessionsModule } from './resources/sessions/sessions.module';
import { Snapshot } from './resources/snapshots/entities/snapshot.entity';
import { SnapshotsModule } from './resources/snapshots/snapshots.module';
import { TraysModule } from './resources/trays/trays.module';
import { User } from './resources/users/entities/user.entity';
import { UsersModule } from './resources/users/users.module';

@Module({
  imports: [
    // graphql
    GraphQLModule.forRoot<ApolloDriverConfig>({
      cors: {
        origin: 'http://localhost:3000',
        credentials: true,
      },
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      driver: ApolloDriver,
      installSubscriptionHandlers: true,
      context: ({ req, res }) => {
        // get the cookie from the request
        // verify the cookie
        // attach the user object to the request object
        return { req, res };
      },
    }),
    // typeorm
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'chain123',
      database: 'endobase_dev',
      entities: [
        Endo,
        Container,
        Tray,
        Action,
        Patient,
        Session,
        Officer,
        Snapshot,
        User,
      ],
      synchronize: true,
    }),
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
