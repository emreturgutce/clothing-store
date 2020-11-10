import nodemailer from 'nodemailer';
import { NODE_ENV } from '../config';

export const sendEmail = async (email: string, url: string) => {
  const testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  const info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: email, // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world?', // plain text body
    html: `<a href="${url}">${url}</a> `, // html body
  });

  if (NODE_ENV === 'development') {
    console.info(`Message sent: ${info.messageId}`.cyan);

    console.info(`Preview URL:  ${nodemailer.getTestMessageUrl(info)}`.cyan);
  }
};
