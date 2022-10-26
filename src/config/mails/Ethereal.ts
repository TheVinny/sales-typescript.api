import nodemailer from 'nodemailer';
import MailTemplate from './MailTemplate';

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

class Ethereal {
  static async sendMail({
    to,
    template,
    from,
    subject,
  }: ISendMail): Promise<void> {
    const account = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass,
      },
    });

    const message = await transporter.sendMail({
      from: {
        name: from?.name || 'Api vendas',
        address: from?.email || 'api@vendas.com.br',
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await new MailTemplate().parse(template),
    });

    console.log('message: %s', message.messageId);
    console.log('previusUrl: %s', nodemailer.getTestMessageUrl(message));
  }
}

export default Ethereal;
