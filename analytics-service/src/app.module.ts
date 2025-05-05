import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Logger, LoggerModule } from 'nestjs-pino';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { Connection } from 'mongoose';
import { MessageBrokerModule } from './message-broker/message-broker.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Analytics, AnalyticsSchema } from './analytics.model';

@Module({
  imports: [
    LoggerModule.forRoot({
      assignResponse: false,
      pinoHttp: {
        autoLogging: false,
        redact: {
          paths: ['req'],
        }
      }
    }),
    ConfigModule.forRoot({
      load: [configuration],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule, LoggerModule],
      useFactory(configService: ConfigService, logger: Logger) {
        return {
          uri: configService.get('database.url'),
          dbName: configService.get('database.name'),
          onConnectionCreate: (connection: Connection) => {
            connection.on('connected', () => logger.log("Database Connected."))
          }
        }
      },
      inject: [ConfigService, Logger]
    }),
    MessageBrokerModule,
    MongooseModule.forFeature([{ name: Analytics.name, schema: AnalyticsSchema }])
  ],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule { }
