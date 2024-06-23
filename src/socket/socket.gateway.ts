import { Inject, Logger } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(SocketGateway.name);
  @WebSocketServer() server: Server;
  private connectedUsers: Map<string, any> = new Map();

  constructor(
    @Inject('SOCKET_SERVICE') protected readonly socketService: ClientKafka,
  ) {}

  handleConnection(client: Socket) {
    const socketId = client.id;
    this.connectedUsers[socketId] = socketId;
  }

  handleDisconnect(client: Socket) {
    const socketId = client.id;
    delete this.connectedUsers[socketId];
  }
}
