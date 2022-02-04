import { Notifiable } from "@/core/notifiable";

export class Contract extends Notifiable {
  public requires(value: any, key: string, message: string): Contract {
    if (value === undefined || value === '' || value === null) {
      this.addNotification(key, message || 'Required Field')
    }
    return this;
  }

  public isEmail(value: any, key: string, message: string): Contract {
    const rgex =/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i
    if (!rgex.test(value)) {
      this.addNotification(key, message || "Email invalid")
    }
    return this;
  }
}