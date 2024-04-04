import { CronJob } from "cron";

type CronTime = string;
type OnTick = () => void;

export class CronService {
  static createJob(cronTime: CronTime, onTick: OnTick) {
    const job = new CronJob(cronTime, onTick);
    job.start();
  }
}
