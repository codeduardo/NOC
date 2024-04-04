import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity } from "../../domain/entities/log.entity";
import fs from "fs";

export class FyleSystemDatasource implements LogDatasource {
  baseLogs: string = "logs/";
  allLogs: string = "logs/logs-all.log";
  mediumLogs: string = "logs/logs-medium.log";
  highLogs: string = "logs/logs-high.log";

  constructor() {
    this.checkDirs();
  }

  checkDirs() {
    if (!fs.existsSync(this.baseLogs)) fs.mkdirSync(this.baseLogs);
    [this.allLogs, this.mediumLogs, this.highLogs].forEach((elem) => {
      if (fs.existsSync(elem)) return;
      fs.writeFileSync(elem, "");
    });
  }

  async saveLog(log: LogEntity): Promise<void> {
    const parsedLog = `${JSON.stringify(log)} \n`;
    fs.appendFileSync(this.allLogs, parsedLog);
    if (log.type === "medium") fs.appendFileSync(this.mediumLogs, parsedLog);
    if (log.type === "high") fs.appendFileSync(this.highLogs, parsedLog);
  }
  async getLogs(): Promise<LogEntity[]> {
    const logs = this.allLogs.split("\n");
    const parsedLogs = logs.map(LogEntity.parsedLog);
    return parsedLogs;
  }
}
