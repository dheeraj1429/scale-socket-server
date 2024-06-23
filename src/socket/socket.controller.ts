import { EVENTS } from '@app/common';
import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SocketGateway } from './socket.gateway';

@Controller()
export class SocketController {
  protected readonly logger = new Logger(SocketController.name);

  constructor(protected readonly socketGateway: SocketGateway) {}

  @MessagePattern(EVENTS.SEND_MESSAGE_TO_KAFKA)
  handleSubscribeMessage(@Payload() payload: string) {
    this.socketGateway.handleSubscribeMessage(payload);
  }
}
