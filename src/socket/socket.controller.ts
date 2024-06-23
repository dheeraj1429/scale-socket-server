import { Controller, Logger } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';

@Controller()
export class SocketController {
  protected readonly logger = new Logger(SocketController.name);

  constructor(protected readonly socketGateway: SocketGateway) {}
}
