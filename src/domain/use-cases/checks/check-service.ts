import { LogClasification, LogEntity } from "../../entities/log.entity";
import { LogRepository } from "../../repositories/log.repository";

interface CheckServiceUseCase {
  execute: (url: string) => void;
}
type SuccessCallback = () => void;
type FailedCallback = (err: string) => void;

export class CheckService implements CheckServiceUseCase {
  constructor(
    private readonly logRepository: LogRepository,
    private readonly successFetch: SuccessCallback,
    private readonly failedFetch: FailedCallback
  ) {}
  async execute(url: string) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("Error fetching data");
      this.successFetch();
      const logEntity = new LogEntity({
        type: LogClasification.low,
        message: "all be okey",
        origin: "check-service.ts",
      });

      this.logRepository.saveLog(logEntity);
    } catch (err) {
      const logEntity = new LogEntity({
        type: LogClasification.high,
        message: `${err}`,
        origin: "check-service.ts",
      });

      this.logRepository.saveLog(logEntity);

      this.failedFetch(`${err}`);
    }
  }
}
