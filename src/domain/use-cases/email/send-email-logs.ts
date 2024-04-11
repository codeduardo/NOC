import { LogClasification, LogEntity } from "../../entities/log.entity";
import { LogRepository } from "../../repositories/log.repository";

interface SendEmailLogsUseCase {
  execute: () => void;
}

export class SendEmailLogs implements SendEmailLogsUseCase {
  constructor(private readonly logRepository: LogRepository) {}
  execute() {
    try {
      const log = new LogEntity({
        type: LogClasification.low,
        message: "from email service",
        origin: "email-service.ts",
      });
      this.logRepository.saveLog(log);
    } catch (err) {
      const logEntity = new LogEntity({
        type: LogClasification.high,
        message: `${err}`,
        origin: "email-service.ts",
      });

      this.logRepository.saveLog(logEntity);
    }
  }
}
