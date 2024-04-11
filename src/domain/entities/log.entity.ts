export enum LogClasification {
  low = "low",
  medium = "medium",
  high = "high",
}

export interface LogOptions {
  type: LogClasification;
  message: string;
  date?: Date;
  origin: string;
}

export class LogEntity {
  public type: LogClasification;
  public message: string;
  public date?: Date;
  public origin: string;

  constructor(log: LogOptions) {
    const { type, message, date = new Date(), origin } = log;
    this.type = type;
    this.message = message;
    this.date = date;
    this.origin = origin;
  }

  static parsedLog(log: string) {
    const { type, message, date, origin } = JSON.parse(log);
    const newLog = new LogEntity({
      type,
      message,
      origin,
      date: new Date(date),
    });
    return newLog;
  }
}
