import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Consumer, EachMessageHandler, Kafka, Producer } from 'kafkajs';

@Injectable()
export class MessageBrokerService {
    kafka: Kafka
    consumer: Consumer
    constructor(
        private configService: ConfigService
    ) {
        this.initliaze()
    }

    private async initliaze() {
        this.kafka = new Kafka({
            clientId: this.configService.get('kafka.clientId'),
            brokers: [this.configService.get('kafka.broker_1')!]
        })
        const topics = [this.configService.get('kafka.email_topic'),this.configService.get('kafka.analytics_topic')]
        const admin = this.kafka.admin()
        const availableTopics = await admin.listTopics()
        const topicsToCreate = topics.filter(topic => !availableTopics.includes(topic))
        await admin.createTopics({
            topics: topicsToCreate.map(topic => ({
                topic: topic
            }))
        })

    }


    public async subscribe(subFn: EachMessageHandler) {
        this.consumer = this.kafka.consumer({
            groupId: this.configService.get('kafka.email_group') || "send_email_group"
        })
        await this.consumer.connect()
        await this.consumer.subscribe({ topic: this.configService.get('kafka.email_topic') || "send_email", fromBeginning: true })
        await this.consumer.run({
            autoCommit:false,
            eachMessage: subFn
        })
    }
    public async commit({ topic, partition, offset }: { topic: string, partition: number, offset: string }) {
        await this.consumer.commitOffsets([{ topic, partition, offset }])
    }
}
