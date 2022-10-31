import nodemailer from 'nodemailer';
import MailTemplate from './MailTemplate';
import aws from 'aws-sdk';
import mailConfig from '@config/mails/mail';

interface IContact {
  name: string;
  email: string;
}

interface IVariables {
  [key: string]: string | number;
}

interface IParse {
  file: string;
  variables: IVariables;
}

interface ISendMail {
  to: IContact;
  from?: IContact;
  subject: string;
  template: IParse;
}

class SesMail {
  static async sendMail({
    to,
    template,
    from,
    subject,
  }: ISendMail): Promise<void> {
    const transporter = nodemailer.createTransport({
      SES: new aws.SES({
        apiVersion: '2010-12-01',
        region: process.env.AWS_REGION,
      }),
    });

    const { email, name } = mailConfig.defaults.from;

    const message = await transporter.sendMail({
      from: {
        name: from?.name || name,
        address: from?.email || email,
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await new MailTemplate().parse(template),
    });
  }
}

export default SesMail;
