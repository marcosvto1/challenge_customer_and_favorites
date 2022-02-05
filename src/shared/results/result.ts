import { Notification  } from "@/core";

export interface IStandardResult<T = any> {
  success: boolean
  messages?: Notification[] | any
  data?: T
}

type MessageType = Notification[] | string[] | Notification;

export abstract class StandardResult<T = any> implements IStandardResult{
  public success: boolean;
  public messages?: MessageType;
  public data?: T;

  public constructor(success: boolean, data?: T, messages?: MessageType) {
    this.success = success;
    this.messages = messages;
    this.data = data;
  }
}

class ErrorResult extends StandardResult {
  constructor(
    messages?: MessageType 
  ) {
    super(false, undefined, messages);
  }
}
class SuccessResult<T = any> extends StandardResult<T> {
  constructor(
    data?: T 
  ) {
    super(true, data);
  }
}

export class Result {
  public static Failed(message?: MessageType) {
    return new ErrorResult(message);
  }

  public static Ok<T = any>(data: T) {
    return new SuccessResult(data);
  }
}