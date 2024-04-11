import nodemailer from "nodemailer";
import { vars } from "../../config/vars.plugin";

export interface SendMailOptions {
  from?: string;
  to: string;
  subject: string;
  html: string;
}

export class EmailService {
  private transporter = nodemailer.createTransport({
    service: vars.MAILER_SERVICE,
    auth: {
      user: vars.MAILER_EMAIL,
      pass: vars.MAILER_PASSWORD,
    },
  });
  public async sendMail({ to, subject, html }: SendMailOptions) {
    try {
      const sendEmail = await this.transporter.sendMail({
        from: '"Eduardo Jaucha👻" <agredu1234@gmail.com>',
        to, //"agredu1941@gmail.com",
        subject, //: "Hello ✔",
        html, //"<b>Hello world?</b>",
      });
      console.log(sendEmail);
    } catch (err) {
      console.log(err);
    }
  }
  public async sendMailWithLogs(to: string) {
    try {
      const sendEmailLogs = await this.transporter.sendMail({
        to,
        subject: "this is a email with logs",
        html: ` <h1>This a email with logs</h1>
        <p>Check them</p>
        `,
        attachments: [
          { filename: "logs-all.log", path: "./logs/logs-all.log" },
          { filename: "logs-high.log", path: "./logs/logs-high.log" },
          { filename: "logs-medium.log", path: "./logs/logs-medium.log" },
        ],
      });
      console.log(sendEmailLogs);
    } catch (err) {
      console.log(err);
    }
  }
}
