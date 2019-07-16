import dotenv from 'dotenv';
import mailer from 'nodemailer';
import template from './templates/notifications';

dotenv.config();

export default async (email, data, action) => {
  const transport = mailer.createTransport({ service: 'gmail',
    auth: { user: process.env.JAWANS_USER,
      pass: process.env.JAWANS_PASS } });
  const notifier = template(action);
  const message = { from: process.env.JAWANS_USER,
    to: email,
    subject: notifier.subject,
    text: 'Authors Haven',
    html: `
           <div style="background:#e5eeff;width:100%;padding:20px 0;">
           <div style="max-width:760px;margin:0 auto;background:#ffffff">
           <div style="background:#266cef;padding:10px;color:#ffffff;text-align:center;font-size:34px">
           Authors Haven - Team Jawans
           </div>
           <div style="padding:20px;text-align:left;">
           ${notifier.html}
           </div>
           <br>
           <div style="padding:20px;text-align:left;">
           <b>Andela, Team Jawans - Cohort 6</b>
           </div>
           </div>
           <div style="padding:35px 10px;text-align:center;">
           Copyright<br>
             Andela, Team Jawans
           </div>
           </div>
      `, };

  const response = await transport.sendMail(message);
  return response;
};
