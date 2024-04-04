import { CheckService } from "../domain/use-cases/checks/check-service";
import { FyleSystemDatasource } from "../infraestructure/datasources/fs.datasource";
import { FsRepositoryImpl } from "../infraestructure/repository/fs.repository.impl";
import { CronService } from "./cron/cron-service";

const fsRepository = new FsRepositoryImpl(new FyleSystemDatasource());
export class Server {
  static execute() {
    console.log("server app ....");
    CronService.createJob("*/3 * * * * *", async () => {
      const url = "http://localhost:3000";
      new CheckService(
        fsRepository,
        () => {
          console.log("connected");
        },
        (err) => {
          console.log(err);
        }
      ).execute(url);
    });
  }
}
