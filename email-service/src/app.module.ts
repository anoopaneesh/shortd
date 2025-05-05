import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule, Logger } from 'nestjs-pino';
import { ConfigModule, ConfigService } from '@nestjs/config'
import configuration from './config/configuration';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { MessageBrokerModule } from './message-broker/message-broker.module';
import { EmailService } from './email/email.service';

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
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get('secret'),
          global: true,
          signOptions: { expiresIn: '1h' }
        }
      },
      inject: [ConfigService]
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
    MessageBrokerModule

  ],
  controllers: [AppController],
  providers: [AppService,EmailService],
})
export class AppModule { }
