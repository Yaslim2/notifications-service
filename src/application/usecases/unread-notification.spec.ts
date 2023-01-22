import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { NotificationNotFound } from './errors/notification-not-found';
import { UnreadNotification } from './unread-notification';

describe('Unread notification', () => {
  it('should be able to unread a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const unreadNotification = new UnreadNotification(notificationsRepository);

    const notification = makeNotification({ readAt: new Date() });

    await notificationsRepository.create(notification);

    await unreadNotification.execute({ notificationId: notification.id });

    expect(notificationsRepository.notifications[0].readAt).toBeNull();
  });

  it('should not be able to unread a notification who was not read yet', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const unreadNotification = new UnreadNotification(notificationsRepository);

    const notification = makeNotification();

    await notificationsRepository.create(notification);

    expect(async () => {
      return await unreadNotification.execute({
        notificationId: notification.id,
      });
    }).rejects.toThrow(
      Error('Cannot unread a notification who was not read yet'),
    );
  });

  it('should not be able to unread a non existing notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const unreadNotification = new UnreadNotification(notificationsRepository);

    expect(async () => {
      return await unreadNotification.execute({
        notificationId: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
