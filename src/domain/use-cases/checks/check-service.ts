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
      const logEntity = new LogEntity(LogClasification.low, "all be okey");

      this.logRepository.saveLog(logEntity);
    } catch (err) {
      const logEntity = new LogEntity(LogClasification.high, `${err}`);

      this.logRepository.saveLog(logEntity);

      this.failedFetch(`${err}`);
    }
  }
}
