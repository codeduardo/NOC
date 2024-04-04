export enum LogClasification {
  low = "low",
  medium = "medium",
  high = "high",
}

export class LogEntity {
  public type: LogClasification;
  public message: string;
  public date: Date;

  constructor(type: LogClasification, message: string) {
    this.type = type;
    this.message = message;
    this.date = new Date();
  }

  static parsedLog(log: string) {
    const { type, message, date } = JSON.parse(log);
    const newLog = new LogEntity(type, message);
    newLog.date = new Date(date);
    return newLog;
  }
}
