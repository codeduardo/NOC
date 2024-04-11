import { CheckService } from '../domain/use-cases/checks/check-service';
import { SendEmailLogs } from '../domain/use-cases/email/send-email-logs';
import { FyleSystemDatasource } from '../infraestructure/datasources/fs.datasource';
import { LogRepositoryImpl } from '../infraestructure/repository/log.repository.impl';

import { CronService } from './cron/cron-service';
import { EmailService } from './email/email.service';

const logRepository = new LogRepositoryImpl(new FyleSystemDatasource());
export class Server {
  static execute() {
    console.log('server app ....');

    const emailService = new EmailService();  
    /*
    emailService.sendMail({
      to: "agredu1941@gmail.com",
      subject: "hello",
      html: "<p>prueba</p>",
    }); */

    /* emailService.sendMailWithLogs("agredu1941@gmail.com"); */

    const emailServiceInf = new SendEmailLogs(logRepository).execute();

    //CronService.createJob("*/3 * * * * *", async () => {
    //  const url = "http://localhost:3000";
    //  new CheckService(
    //    fsRepository,
    //    () => {
    //      console.log("connected");
    //    },
    //    (err) => {
    //      console.log(err);
    //    }
    //  ).execute(url);
    //});
  }
}
