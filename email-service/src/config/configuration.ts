export default () => ({
  host: process.env.HOST,
  port: parseInt(process.env.PORT || '', 10),
  shortd: {
    host: process.env.SHORTD_SERVICE_HOST
  },
  database: {
    url: process.env.DATABASE_URL,
    name: process.env.DATABASE_NAME
  },
  email: {
    user: process.env.EMAIL_USER,
    password: process.env.EMAIL_PASSWORD
  },
  kafka: {
    clientId: process.env.KAFKA_CLIENT_ID,
    broker_1: process.env.KAFKA_BROKER_1,
    email_topic: process.env.KAFKA_EMAIL_TOPIC,
    email_group: process.env.KAFKA_EMAIL_GROUP,
    analytics_topic:process.env.KAFKA_ANALYTICS_TOPIC,
  },
  secret: process.env.SECRET
});
