import { Body, Controller, Post } from '@nestjs/common';
import { SendNotification } from 'src/application/usecases/send-notifications';
import { CreateNotificationBody } from '../dtos/create-notification-body';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly sendNotification: SendNotification) {}

  @Post()
  async create(
    @Body() { recipientId, content, category }: CreateNotificationBody,
  ) {
    const { notification } = await this.sendNotification.execute({
      category,
      content,
      recipientId,
    });
    return { notification };
  }
}
