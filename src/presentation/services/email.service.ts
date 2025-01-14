import { Transporter } from "nodemailer"
import { Attachment } from "nodemailer/lib/mailer";

export interface SendEmailOptions {
  to: string | string[],
  subject: string;
  htmlBody: string;
  attachments?: Attachment[]
}

export class EmailService {
  private transporter : Transporter;

  constructor(
    mailerSrvice: string,
    mailerEmail: string,
    senderEmailPassword: string,
    private readonly postToProvider: boolean
  ){
    this.transporter = nodemailer.createTransport({
      service: mailerSrvice,
      auth: {
        user: mailerEmail,
        pass: senderEmailPassword,
      }
    })
  }
async senEmail( options: SendEmailOptions){
  const { to, subject, htmlBody, attachments = []} =
}
}