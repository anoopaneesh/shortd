import { Global, Module } from '@nestjs/common';
import { MessageBrokerService } from './message-broker.service'; 
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [MessageBrokerService],
  exports:[MessageBrokerService]
})
export class MessageBrokerModule { }
