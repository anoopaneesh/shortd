import { Injectable } from '@nestjs/common';
import { MessageBrokerService } from './message-broker/message-broker.service';
import { Logger } from 'nestjs-pino';
import { InjectModel } from '@nestjs/mongoose';
import { Analytics } from './analytics.model';
import { Model } from 'mongoose';

@Injectable()
export class AppService {

  constructor(
    private broker: MessageBrokerService,
    private logger: Logger,
    @InjectModel(Analytics.name)
    private analyticsModel: Model<Analytics>,
  ) {
    this.initialize()
  }

  private async initialize() {
    this.broker.subscribe(async ({ topic, partition, message }) => {
      try {
        this.logger.log("Started processing analytics event")
        const msg = message.value?.toString()
        if (msg) {
          const eventData = JSON.parse(msg)
          await this.analyticsModel.create(eventData)
        }
        await this.broker.commit({ topic, partition, offset: (Number(message.offset) + 1).toString() })
        this.logger.log("Successfully processed analytics event ")

      } catch (error) {
        this.logger.error("Error while processing analytics event")
        throw error
      }
    })
  }
}
