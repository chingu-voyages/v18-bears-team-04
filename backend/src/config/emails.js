import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config();

const sendEmail = async (to, subject, message) => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to,
      from: 'amaechichuks101@gmail.com',
      subject,
      html: message,
    };
    await sgMail.send(msg).then(() => {
        console.log('Message sent')
    }).catch((error) => {
        console.log(error.response.body)
    })
};
export default sendEmail;
