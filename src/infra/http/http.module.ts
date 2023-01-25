import { Module } from '@nestjs/common';
import { SendNotification } from '@application/usecases/send-notification';
import { DatabaseModule } from '@infra/database/database.module';
import { NotificationsController } from './controllers/notifications.controller';
import { CancelNotification } from '@application/usecases/cancel-notification';
import { ReadNotification } from '@application/usecases/read-notification';
import { UnreadNotification } from '@application/usecases/unread-notification';
import { GetRecipientNotifications } from '@application/usecases/get-recipient-notifications';
import { CountRecipientNotifications } from '@application/usecases/count-recipient-notifications';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [
    SendNotification,
    CancelNotification,
    ReadNotification,
    UnreadNotification,
    GetRecipientNotifications,
    CountRecipientNotifications,
  ],
})
export class HttpModule {}
