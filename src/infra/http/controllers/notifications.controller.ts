import { Body, Controller, Post } from '@nestjs/common';
import { SendNotification } from '@application/usecases/send-notification';
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { NotificationViewModel } from '../view-models/notification-view-model';

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
    return { notification: NotificationViewModel.toHTTP(notification) };
  }
}
