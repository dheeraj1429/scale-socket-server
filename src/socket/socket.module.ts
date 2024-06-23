import { Module } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  SOCKET_SERVICE_CLIENT_ID,
  SOCKET_SERVICE_CONSUMER_GROUP_ID,
} from '@app/common';
import { SocketController } from './socket.controller';

@Module({
  imports: [
    ClientsModule,
    ClientsModule.register([
      {
        name: 'SOCKET_SERVICE',
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
      },
    ]),
  ],
  controllers: [SocketController],
  providers: [SocketGateway],
  exports: [SocketGateway],
})
export class SocketModule {}
