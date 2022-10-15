import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';

import { Endo } from './endos/endo.entity';
import { EndosModule } from './endos/endo.module';

import { ContainersModule } from './containers/containers.module';
import { Container } from './containers/entities/container.entity';
import { TraysModule } from './trays/trays.module';
import { Tray } from './trays/entities/tray.entity';
import { SerialportsModule } from './serialports/serialports.module';

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
      entities: [Endo, Container, Tray],
      synchronize: true,
    }),
    // resoureces
    EndosModule,
    ContainersModule,
    TraysModule,
    SerialportsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
