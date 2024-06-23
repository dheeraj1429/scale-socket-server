import { EVENTS } from '@app/common';
import { Inject, Logger } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class SocketGateway {
  private readonly logger = new Logger(SocketGateway.name);
  @WebSocketServer() server: Server;

  constructor(
    @Inject('SOCKET_SERVICE') protected readonly socketService: ClientKafka,
  ) {}

  @SubscribeMessage(EVENTS.SEND_MESSAGE)
  handleMessage(@MessageBody() message: string) {
    this.logger.log(`handleMessage called: ${message}`);
    this.socketService.emit(EVENTS.SEND_MESSAGE_TO_KAFKA, message);
  }

  handleSubscribeMessage(payload: any) {
    this.server.emit(EVENTS.ON_SUBSCRIBE_MESSAGE, payload);
  }
}
