import { Notifiable } from "@/core/notifiable";

export class Contract extends Notifiable {
  public requires(value: any, key: string, message: string): Contract {
    if (value === undefined || value === '' || value === null) {
      this.addNotification(key, message || 'Required Field')
    }
    return this;
  }

  public isGreaterThan(value: number, comparer: number, key: string, message?: string): Contract {
    if (value <= comparer) {
      this.addNotification(key, message || `The value ${value} must be greater than ${comparer}`)
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

  public isGUID(value: string, key: string, message: string) {
    // regex by geeksForGeeks
    const rgex =/^[{]?[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}[}]?$/i
    if (!rgex.test(value)) {
      this.addNotification(key, message || "GUID invalid")
    }
    return this;
  }
}