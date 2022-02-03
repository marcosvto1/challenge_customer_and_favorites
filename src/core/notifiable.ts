import { Notification } from "@/core/notification";

export abstract class Notifiable {

  protected notifications: Array<Notification> = [];

  public addNotification(key: string, value: string) {
    this.notifications.push(new Notification(key, value))
  }

  public addNotifications(notifications: Array<Notifiable>) {
    const notificationsToMerge = notifications.map((notifiable: Notifiable) => notifiable.notifications).flat()
    this.notifications = this.notifications.concat(notificationsToMerge);
  }

  public isValid() {
    return this.notifications.length === 0
  }

  public getNotifications() {
    return this.notifications;
  }
}