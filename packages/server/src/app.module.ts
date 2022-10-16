import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';

import { Container } from './resources/containers/entities/container.entity';
import { Endo } from './resources/endos/entities/endo.entity';
import { Tray } from './resources/trays/entities/tray.entity';
import { Officer } from './resources/officers/entities/officer.entity';
import { Patient } from './resources/patients/entities/patient.entity';
import { Action } from './resources/actions/entities/action.entity';
import { Session } from './resources/sessions/entities/session.entity';

import { ContainersModule } from './resources/containers/containers.module';
import { ActionsModule } from './resources/actions/actions.module';
import { EndosModule } from './resources/endos/endo.module';
import { OfficersModule } from './resources/officers/officers.module';
import { PatientsModule } from './resources/patients/patients.module';
import { SerialportsModule } from './resources/serialports/serialports.module';
import { SessionsModule } from './resources/sessions/sessions.module';
import { TraysModule } from './resources/trays/trays.module';

@Module({
  imports: [
    // graphql
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      driver: ApolloDriver,
      installSubscriptionHandlers: true,
    }),
    // typeorm
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'chain123',
      database: 'endobase_dev',
      entities: [Endo, Container, Tray, Action, Patient, Session, Officer],
      synchronize: true,
    }),
    // resoureces
    EndosModule,
    ContainersModule,
    TraysModule,
    SerialportsModule,
    ActionsModule,
    SessionsModule,
    OfficersModule,
    PatientsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
