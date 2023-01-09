import { PrismaService } from './prisma.service';
import { Controller, Get, Post } from '@nestjs/common';
import { randomUUID } from 'crypto';

@Controller('notifications')
export class AppController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get()
  async list() {
    return await this.prismaService.notification.findMany();
  }

  @Post()
  async create() {
    return await this.prismaService.notification.create({
      data: {
        id: randomUUID(),
        content: 'Você tem uma nova solicitação de amizade!',
        category: 'social',
        recipientId: randomUUID(),
      },
    });
  }
}
