import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { HOST_MAIL, PORT_MAIL } from 'src/constants';

@Injectable()
export class MailService {
  private readonly user: string;
  private readonly password: string;

  constructor(private readonly configService: ConfigService) {
    this.user = configService.get<string>('ethereal-email.username');
    this.password = configService.get<string>('ethereal-email.password');
  }

  async sendEmail(
    email: string,
    companyName: string,
  ): Promise<SMTPTransport.SentMessageInfo> {
    try {
      const transporter = nodemailer.createTransport({
        host: HOST_MAIL,
        port: PORT_MAIL,
        secure: false,
        auth: {
          user: this.user,
          pass: this.password,
        },
      });

      return await transporter.sendMail({
        from: 'TEST',
        to: email,
        subject: 'Your application was received !',
        text: `Thank you for submit your application for ${companyName} job`,
      });
    } catch (error) {
      console.error(error);
      throw new BadRequestException();
    }
  }
}
