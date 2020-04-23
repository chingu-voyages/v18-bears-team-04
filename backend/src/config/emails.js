import nodemailer from 'nodemailer';
const sendEmail = async (to, subject, message) => {
  // use nodemailler during testing and development
    const account = await nodemailer.createTestAccount();
    const transporter = await nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: { user: account.user, pass: account.pass },
    });
    const mailOptions = {
      from: 'no-reply@iScholars.com',
      to,
      subject,
      html: message,
    };
    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

};

export default sendEmail;
