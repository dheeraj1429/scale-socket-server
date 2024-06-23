import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import {
  SOCKET_SERVICE_CLIENT_ID,
  SOCKET_SERVICE_CONSUMER_GROUP_ID,
} from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: SOCKET_SERVICE_CLIENT_ID,
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: SOCKET_SERVICE_CONSUMER_GROUP_ID,
      },
    },
  });

  app.listen(3000);
  await app.startAllMicroservices();
}
bootstrap();
