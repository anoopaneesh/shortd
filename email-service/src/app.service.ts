import { Injectable } from '@nestjs/common';
import { EmailService } from './email/email.service';
import { MessageBrokerService } from './message-broker/message-broker.service';
import { Logger } from 'nestjs-pino';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AppService {
  constructor(
    private emailService: EmailService,
    private broker: MessageBrokerService,
    private logger: Logger,
    private jwtService: JwtService
  ) {
    this.initialize()
  }


  private async initialize() {
    this.broker.subscribe(async ({ topic, partition, message }) => {
      try {
        this.logger.log("Started processing send_email event")
        const msg = message.value?.toString()
        if (msg) {
          const eventData = JSON.parse(msg)
          const signedEmailToken = this.jwtService.sign({ id: eventData.id, email: eventData.email })
          await this.emailService.sendEmailVerify(eventData.email, signedEmailToken)
          console.log(eventData)
        }
        await this.broker.commit({ topic, partition, offset: (Number(message.offset) + 1).toString() })
        this.logger.log("Successfully processed send_email event ")

      } catch (error) {
        this.logger.error("Error while processing send_email event")
      }
    })
  }
}
